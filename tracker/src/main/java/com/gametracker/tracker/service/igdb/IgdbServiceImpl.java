package com.gametracker.tracker.service.igdb;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;
import com.gametracker.tracker.service.IgdbAuth.IgbdAuthService;

@Service
public class IgdbServiceImpl implements IgdbService {

    private final RestClient restClient;
    private final IgbdAuthService igdbAuthService;

    @Value("${igdb.client-id}")
    private String clientId;

    @Value("${igdb.api-url}")
    private String apiUrl;

    public IgdbServiceImpl(IgbdAuthService igdbAuthService) {
        this.restClient = RestClient.create();
        this.igdbAuthService = igdbAuthService;
    }

    @Override
    public List<IgdbGameDto> searchGames(com.gametracker.tracker.dto.IGDB.IgdbSearchRequestDto searchRequest) {
        String token = igdbAuthService.getAccessToken();

        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("fields name, summary, first_release_date, cover.url, genres.name, platforms.name, screenshots.url, involved_companies.developer, involved_companies.publisher, involved_companies.company.name;");

        if (searchRequest.getName() != null && !searchRequest.getName().trim().isEmpty()) {
            queryBuilder.append(" search \"").append(searchRequest.getName().trim()).append("\";");
        } else {
            queryBuilder.append(" sort popularity desc;");
        }

        int offset = searchRequest.getPage() * searchRequest.getSize();
        queryBuilder.append(" limit ").append(searchRequest.getSize()).append(";");
        queryBuilder.append(" offset ").append(offset).append(";");

        return restClient.post()
                .uri(apiUrl + "/games")
                .header("Client-ID", clientId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.TEXT_PLAIN)
                .body(queryBuilder.toString())
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<List<IgdbGameDto>>() {});
    }

    @Override
    public IgdbGameDto getGameById(Long id) {
        String token = igdbAuthService.getAccessToken();

        String requestBody = "fields name, summary, first_release_date, cover.url, genres.name, platforms.name, screenshots.url, involved_companies.developer, involved_companies.publisher, involved_companies.company.name; where id = " + id + ";";

        List<IgdbGameDto> games = restClient.post()
                .uri(apiUrl + "/games")
                .header("Client-ID", clientId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.TEXT_PLAIN)
                .body(requestBody)
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<List<IgdbGameDto>>() {});

        return (games != null && !games.isEmpty()) ? games.get(0) : null;
    }
}