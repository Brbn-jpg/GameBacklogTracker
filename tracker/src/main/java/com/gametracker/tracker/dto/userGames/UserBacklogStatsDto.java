package com.gametracker.tracker.dto.userGames;

import java.util.Map;

import com.gametracker.tracker.enums.Status;

import lombok.Data;

@Data
public class UserBacklogStatsDto {
    private long totalGames;
    private Map<Status, Long> gamesByStatus;
    private double totalHoursPlayed;
    private double averageRating;
}
