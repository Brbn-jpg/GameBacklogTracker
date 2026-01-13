package com.gametracker.tracker.dto.auth.passwordReset;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordRequestDto {
    @NotBlank
    @Email
    private String email;
}
