package com.gametracker.tracker.service;

import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.user.UpdateUserEmailDto;
import com.gametracker.tracker.dto.user.UpdateUserPasswordDto;
import com.gametracker.tracker.dto.user.UpdateUserPublicDto;
import com.gametracker.tracker.dto.user.UpdateUserUsernameDto;
import com.gametracker.tracker.dto.user.UserResponseDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;
import com.gametracker.tracker.enums.Role;
import com.gametracker.tracker.exceptions.ForbiddenAccessException;
import com.gametracker.tracker.exceptions.UserAlreadyExistsException;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.repository.UserRepository;
import com.gametracker.tracker.security.JwtService;
import com.gametracker.tracker.security.UserDetailService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserDetailService userDetailService;
    private final PasswordEncoder passwordEncoder;
    private final UserGameServiceImpl userGameServiceImpl;

    public UserServiceImpl(UserRepository userRepository, JwtService jwtService, UserDetailService userDetailService, PasswordEncoder passwordEncoder, UserGameServiceImpl userGameServiceImpl){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userDetailService = userDetailService;
        this.passwordEncoder = passwordEncoder;
        this.userGameServiceImpl = userGameServiceImpl;
    }

    @Override
    @Transactional
    public TokenDto registerUser(RegisterDto dto){
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

        User savedUser = this.userRepository.save(newUser);
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
        dto.setUserGames(getUserGames(foundUser));

        return dto;
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
