package com.gametracker.tracker.service;

import java.util.List;

import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.user.UpdateUserEmailDto;
import com.gametracker.tracker.dto.user.UpdateUserPasswordDto;
import com.gametracker.tracker.dto.user.UpdateUserPublicDto;
import com.gametracker.tracker.dto.user.UpdateUserUsernameDto;
import com.gametracker.tracker.dto.user.UserResponseDto;

public interface UserService {
    TokenDto registerUser(RegisterDto dto);
    UserResponseDto updateUserEmail(String token, UpdateUserEmailDto dto);
    UserResponseDto updateUserPassword(String token, UpdateUserPasswordDto dto);
    UserResponseDto updateUserUsername(String token, UpdateUserUsernameDto dto);
    UserResponseDto updateUserPublic(String token, UpdateUserPublicDto dto);
    UserResponseDto findUserById(Long id);
    List<UserResponseDto> findUserByUsername(String username);
    UserResponseDto getUserProfile(String token);
    boolean deleteUser(String token);
    List<UserResponseDto> findAllUsers();
}
