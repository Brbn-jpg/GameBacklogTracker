package com.gametracker.tracker.service.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.auth.VerifyUserDto;
import com.gametracker.tracker.dto.user.UpdateUserEmailDto;
import com.gametracker.tracker.dto.user.UpdateUserPasswordDto;
import com.gametracker.tracker.dto.user.UpdateUserPublicDto;
import com.gametracker.tracker.dto.user.UpdateUserUsernameDto;
import com.gametracker.tracker.dto.user.UserResponseDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;
import com.gametracker.tracker.enums.RegisterStatus;
import com.gametracker.tracker.enums.Role;
import com.gametracker.tracker.exceptions.ForbiddenAccessException;
import com.gametracker.tracker.exceptions.UserAlreadyExistsException;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.repository.UserRepository;
import com.gametracker.tracker.security.JwtService;
import com.gametracker.tracker.security.UserDetailService;
import com.gametracker.tracker.service.email.EmailService;
import com.gametracker.tracker.service.userGame.UserGameServiceImpl;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserDetailService userDetailService;
    private final PasswordEncoder passwordEncoder;
    private final UserGameServiceImpl userGameServiceImpl;
    private final EmailService emailService;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public UserServiceImpl(UserRepository userRepository, JwtService jwtService, UserDetailService userDetailService, PasswordEncoder passwordEncoder, UserGameServiceImpl userGameServiceImpl, EmailService emailService, StringRedisTemplate redisTemplate, ObjectMapper objectMapper){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userDetailService = userDetailService;
        this.passwordEncoder = passwordEncoder;
        this.userGameServiceImpl = userGameServiceImpl;
        this.emailService = emailService;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    @Transactional
    public User registerUser(RegisterDto dto){
        Optional<User> foundUser = this.userRepository.findByEmail(dto.getEmail());
        if(foundUser.isPresent()){
            throw new UserAlreadyExistsException("User with email "+dto.getEmail()+" already exists!");
        }
        
        User newUser = new User();
        newUser.setUsername(dto.getUsername());
        newUser.setEmail(dto.getEmail());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.setCreatedAt(LocalDate.now());
        newUser.setRole(Role.USER);
        newUser.setRegisterStatus(RegisterStatus.NOT_VERIFIED);
        newUser.setIsPublic(false);

        String redisKey = "verify_code:" + dto.getEmail();
        String code = this.emailService.generateCode();

        redisTemplate.opsForValue().set(redisKey, code, 15, TimeUnit.MINUTES);
        this.emailService.sendVerificationEmail(dto.getEmail(), code);

        try {
            String userJson = objectMapper.writeValueAsString(newUser);
            this.redisTemplate.opsForValue().set("pending_user:" + dto.getEmail(), userJson, 15, TimeUnit.MINUTES);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error while processing user data", e);
        }

        return newUser;
    }

    @Override
    @Transactional
    public TokenDto verifyUser(VerifyUserDto dto){
        String redisKey = "verify_code:" + dto.getEmail();
        String redisUser = "pending_user:" + dto.getEmail();
        String cachedCode = redisTemplate.opsForValue().get(redisKey);
        
        if(cachedCode == null || !cachedCode.equals(dto.getCode())){
            throw new IllegalArgumentException("Wrong or expired code!");
        }
        
        String userJson = redisTemplate.opsForValue().get(redisUser);
        if (userJson == null) {
            throw new RuntimeException("Registration expired or user data not found");
        }
   
        User newUser;
        try {
            newUser = objectMapper.readValue(userJson, User.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error while reading user data", e);
        }

        newUser.setRegisterStatus(RegisterStatus.VERIFIED);
        User savedUser = this.userRepository.save(newUser);
        
        // Clean up Redis
        redisTemplate.delete(redisKey);
        redisTemplate.delete(redisUser);

        TokenDto tokenDto = new TokenDto();
        tokenDto.setToken(this.jwtService.generateToken(userDetailService.loadUserByUsername(savedUser.getEmail())));
        return tokenDto;
    }

    @Override
    @Transactional
    public UserResponseDto updateUserEmail(String token, UpdateUserEmailDto dto){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required to change email");
        }

        if (!passwordEncoder.matches(dto.getPassword(), foundUser.getPassword())) {
            throw new SecurityException("Incorrect password");
        }

        Optional<User> differentUserEmail = this.userRepository.findByEmail(dto.getEmail());
        if(differentUserEmail.isPresent()){
            throw new UserAlreadyExistsException("User with email "+dto.getEmail()+" already exists!");
        }

        if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            foundUser.setEmail(dto.getEmail());
        }

        this.userRepository.save(foundUser);
        return mapUserToDto(foundUser);
    }
    
    @Override
    @Transactional
    public UserResponseDto updateUserPassword(String token, UpdateUserPasswordDto dto){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        if(dto.getOldPassword() == null || dto.getPassword() == null) {
            throw new IllegalArgumentException("Both old and new passwords are required");
        }

        if(!passwordEncoder.matches(dto.getOldPassword(), foundUser.getPassword())){
            throw new SecurityException("Incorrect old password");
        }

        if(!dto.getPassword().equals(dto.getRepeatedPassword())){
            throw new IllegalArgumentException("New passwords do not match");
        }

        foundUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        this.userRepository.save(foundUser);
        return mapUserToDto(foundUser);
    }

    @Override
    @Transactional
    public UserResponseDto updateUserUsername(String token, UpdateUserUsernameDto dto){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        if(dto.getUsername().equals(foundUser.getUsername())){
            throw new IllegalArgumentException("New username has to be different");
        }

        foundUser.setUsername(dto.getUsername());
        this.userRepository.save(foundUser);
        return mapUserToDto(foundUser);
    }

    @Override
    @Transactional
    public UserResponseDto updateUserPublic(String token, UpdateUserPublicDto dto){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        foundUser.setIsPublic(dto.getIsPublic());
        this.userRepository.save(foundUser);
        return mapUserToDto(foundUser);
    }

    @Override
    public UserResponseDto findUserById(Long id){
        User user = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id: "+id+" was not found"));
        UserResponseDto dto = mapUserToDto(user);
        
        if (Boolean.FALSE.equals(user.getIsPublic())) {
            dto.setUserGames(null);
        }
        
        return dto;
    }

    @Override
    public List<UserResponseDto> findUserByUsername(String username){
        if(username != null && !username.isEmpty()){
            List<User> users = this.userRepository.findByUsernameContaining(username);
            return users.stream()
                .map(user -> {
                    UserResponseDto dto = mapUserToDto(user);
                    if (Boolean.FALSE.equals(user.getIsPublic())) {
                        dto.setUserGames(null);
                    }
                    return dto;
                }).collect(Collectors.toList());
        }

        throw new IllegalArgumentException("Username cannot be null or empty");
    }

    @Override
    @Transactional
    public boolean deleteUser(String token){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        this.userRepository.delete(foundUser);
        return true;
    }

    @Override
    public List<UserResponseDto> findAllUsers(){
        List<User> users = this.userRepository.findAll();
        List<User> publicUsers = users.stream().filter(u -> Boolean.TRUE.equals(u.getIsPublic())).toList();
        return mapUserToDto(publicUsers);
    }

    @Override
    public UserResponseDto getUserProfile(String token){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        UserResponseDto dto = new UserResponseDto();
        dto.setUsername(foundUser.getUsername());
        dto.setIsPublic(foundUser.getIsPublic());
        dto.setUserGames(getUserGames(foundUser));

        return dto;
    }

    @Override
    public void processForgotPassword(String email){
        Optional<User> user = this.userRepository.findByEmail(email);

        if(user.isPresent()){
            String generatedToken = UUID.randomUUID().toString();
    
            String redisKey = "resetToken:"+generatedToken;
            redisTemplate.opsForValue().set(redisKey, email, 15, TimeUnit.MINUTES);
    
            this.emailService.sendPasswordResetEmail(email, generatedToken);
        }
    }

    @Override
    public void resetPassword(String token, String newPassword){
        String redisKey = "resetToken:"+token;
        String email = redisTemplate.opsForValue().get(redisKey);
        if(email == null){
            throw new RuntimeException("Token is invalid or expired");
        }

        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email: "+email+"was not found"));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        this.userRepository.save(user);

        redisTemplate.delete(redisKey);
    }

    // Helpers
    private User findUser(String token){
        String jwt = token;

        if(token != null && token.startsWith("Bearer ")){
            jwt = token.substring(7);
        }

        if(!jwtService.isTokenValid(jwt)){
            throw new ForbiddenAccessException("Invalid or expired token");
        }

        long userId = jwtService.extractId(jwt);
        return this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with userId "+userId+" was not found"));
    }

    private List<UserGameResponseDto> getUserGames(User user){
        return user.getUserGames().stream().map(userGameServiceImpl::mapToDto).collect(Collectors.toList());
    }

    private List<UserResponseDto> mapUserToDto(List<User> users){
        return users.stream()
                .map(user -> {
                    UserResponseDto dto = new UserResponseDto();
                    dto.setUsername(user.getUsername());
                    dto.setIsPublic(user.getIsPublic());
                    dto.setUserGames(getUserGames(user));
                    return dto;
                }).collect(Collectors.toList());
    }

    private UserResponseDto mapUserToDto(User user){
        UserResponseDto dto = new UserResponseDto();
        dto.setUsername(user.getUsername());
        dto.setIsPublic(user.getIsPublic());
        dto.setUserGames(getUserGames(user));
        return dto;
    }
}
