package com.gametracker.tracker.dto.user;

import java.util.List;

import com.gametracker.tracker.dto.userGames.UserGameResponseDto;

import lombok.Data;

@Data
public class UserResponseDto {
    private String username;
    private List<UserGameResponseDto> userGames;
}
