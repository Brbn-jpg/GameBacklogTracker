package com.gametracker.tracker.service;

import java.util.List;

import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.user.UpdateUserDto;
import com.gametracker.tracker.dto.user.UserResponseDto;

public interface UserService {
    TokenDto registerUser(RegisterDto dto);
    UserResponseDto updateUser(String token, UpdateUserDto dto);
    UserResponseDto findUserById(Long id);
    List<UserResponseDto> findUserByUsername(String username);
    UserResponseDto getUserProfile(String token);
    boolean deleteUser(String token);
    List<UserResponseDto> findAllUsers();
}
