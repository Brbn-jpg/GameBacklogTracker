package com.gametracker.tracker.dto.user;

import lombok.Data;

@Data
public class UpdateUserPasswordDto {
    private String oldPassword;
    private String password;
    private String repeatedPassword;
}
