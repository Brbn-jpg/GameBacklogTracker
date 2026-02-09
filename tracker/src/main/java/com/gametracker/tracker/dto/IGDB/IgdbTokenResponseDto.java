package com.gametracker.tracker.dto.IGDB;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class IgdbTokenResponseDto {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("expires_in")
    private Long expiresIn;
    @JsonProperty("token_type")
    private String tokenType;
}
