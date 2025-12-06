package com.gametracker.tracker.service;

import java.util.List;

import com.gametracker.tracker.dto.userGames.UpdateUserGameDto;
import com.gametracker.tracker.dto.userGames.UserBacklogStatsDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;

public interface UserGameService {
    List<UserGameResponseDto> getUserGames(String token);
    UserGameResponseDto addUserGame(long gameId, String token);
    UserGameResponseDto updateUserGame(long userGameId, UpdateUserGameDto dto, String token);
    boolean deleteUserGame(long userGameId, String token);
    UserBacklogStatsDto getBacklogStats(String token);
}
