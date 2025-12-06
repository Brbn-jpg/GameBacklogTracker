package com.gametracker.tracker.dto.userGames;

import java.time.LocalDate;

import com.gametracker.tracker.enums.Status;

import lombok.Data;

@Data
public class UserGameResponseDto {
    private Long id;
    private Long userId;
    private String username;
    private Long gameId;
    private String gameTitle;
    private String headerImage;
    private Status status;
    private Double hoursPlayed;
    private int rating;
    private LocalDate addedAt;
}
