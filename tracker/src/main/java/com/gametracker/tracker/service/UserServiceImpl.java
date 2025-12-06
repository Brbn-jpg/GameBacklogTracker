package com.gametracker.tracker.service;

import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.user.UpdateUserDto;
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
    public UserResponseDto updateUser(String token, UpdateUserDto dto){
        long userId = findUser(token).getId();
        User foundUser = this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id "+userId+" was not found"));

        if(dto.getUsername() != null){
            foundUser.setUsername(dto.getUsername());

        }

        if(dto.getEmail() != null){
            foundUser.setEmail(dto.getEmail());
        }

        if(dto.getPassword() != null){
            foundUser.setPassword(dto.getPassword());
        }

        User updatedUser = this.userRepository.save(foundUser);
        UserResponseDto userDto = new UserResponseDto();
        userDto.setUsername(updatedUser.getUsername());
        userDto.setUserGames(getUserGames(updatedUser));

        return userDto;
    }

    @Override
    public UserResponseDto findUserById(Long id){
        User user = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id: "+id+" was not found"));
        UserResponseDto dto = new UserResponseDto();
        dto.setUsername(user.getUsername());
        

        dto.setUserGames(getUserGames(user));

        return dto;
    }

    @Override
    public List<UserResponseDto> findUserByUsername(String username){
        if(username != null && !username.isEmpty()){
            List<User> users = this.userRepository.findByUsernameContaining(username);
            return mapUserToDto(users);
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
        return mapUserToDto(users);
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
                    dto.setUserGames(getUserGames(user));
                    return dto;
                }).collect(Collectors.toList());
    }
}
