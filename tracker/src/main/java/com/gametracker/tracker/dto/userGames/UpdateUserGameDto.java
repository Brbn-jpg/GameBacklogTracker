package com.gametracker.tracker.dto.userGames;

import com.gametracker.tracker.enums.Status;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateUserGameDto {
    private Status status;
    @Min(value = 1, message = "Rating must be between 1 and 10")
    @Max(value = 10, message = "Rating must be between 1 and 10")
    private Integer rating;

    @Min(value = 0, message = "Hours played cannot be neagitve")
    private Double hoursPlayed;
}
