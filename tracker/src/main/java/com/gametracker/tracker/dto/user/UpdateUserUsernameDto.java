package com.gametracker.tracker.dto.user;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateUserUsernameDto {
    @Min(value = 4)
    private String username;
}
