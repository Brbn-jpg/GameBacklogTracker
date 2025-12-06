package com.gametracker.tracker.dto.auth;

import lombok.Data;

@Data
public class TokenDto {
    private String token;
    private String type="Bearer";
}
