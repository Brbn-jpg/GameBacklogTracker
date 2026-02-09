package com.gametracker.tracker.service.IgdbAuth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.gametracker.tracker.dto.IGDB.IgdbTokenResponseDto;

@Service
public class IgbdAuthServiceImpl implements IgbdAuthService{
    private final RestClient restClient;
    private String cachedToken;

    @Value("${igdb.client-id}")
    private String clientId;

    @Value("${igdb.client-secret}")
    private String clientSecret;

    public IgbdAuthServiceImpl(){
        this.restClient = RestClient.create();
    }

    public String getAccessToken(){
        if(cachedToken != null){
            return cachedToken;
        }

        IgdbTokenResponseDto response = restClient.post()
            .uri("https://id.twitch.tv/oauth2/token?client_id={id}&client_secret={secret}&grant_type=client_credentials", clientId, clientSecret)
            .retrieve()
            .body(IgdbTokenResponseDto.class);

        if(response == null){
            throw new IllegalAccessError("wrong credentials or expired token");
        }
        
        this.cachedToken = response.getAccessToken();
        return this.cachedToken;
    }
}
