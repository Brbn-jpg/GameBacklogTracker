package com.gametracker.tracker.dto.userGames;

import com.gametracker.tracker.enums.Status;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddUserGameDto {
    @NotNull
    private Long gameId;
    @NotNull
    private Status status;
}