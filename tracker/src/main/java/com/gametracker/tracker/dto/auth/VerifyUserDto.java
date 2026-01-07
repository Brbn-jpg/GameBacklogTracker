package com.gametracker.tracker.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyUserDto {
    @NotBlank
    private String email;
    private String code;
}
