package com.gametracker.tracker.dto.userGames;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddUserGameDto {
    @NotNull
    private Long gameId;
}