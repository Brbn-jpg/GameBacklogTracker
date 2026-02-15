package com.gametracker.tracker.service.igdb;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;
import com.gametracker.tracker.dto.IGDB.IgdbSearchRequestDto;
import com.gametracker.tracker.service.IgdbAuth.IgbdAuthService;

@Service
public class IgdbServiceImpl implements IgdbService {

    private static final String GAME_FIELDS = "fields name, summary, first_release_date, cover.url, genres.name, platforms.name, screenshots.url, involved_companies.developer, involved_companies.publisher, involved_companies.company.name;";

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
    public List<IgdbGameDto> searchGames(IgdbSearchRequestDto searchRequest) {
        StringBuilder query = new StringBuilder(GAME_FIELDS);

        String name = searchRequest.getName();
        if(name.isEmpty()){
            throw new IllegalArgumentException("game with name " +name+ " was not found");
        }
        boolean isSearch = name != null && !name.isBlank();

        if (isSearch) {
            query.append(" search \"").append(name.trim().replace("\"", "\\\"")).append("\";");
        }

        List<String> conditions = new ArrayList<>();

        if (!isSearch) {
            conditions.add("total_rating_count != null");
        }

        List<String> genres = searchRequest.getGenres();
        if (genres != null && !genres.isEmpty()) {
            for (String genre : genres) {
                conditions.add("genres.name ~ \"" + genre.replace("\"", "\\\"") + "\"");
            }
        }

        appendListFilter(conditions, "platforms.name", searchRequest.getPlatforms());
        
        appendCompanyFilter(conditions, searchRequest.getDevelopers());
        appendCompanyFilter(conditions, searchRequest.getPublishers());

        if (!conditions.isEmpty()) {
            query.append(" where ").append(String.join(" & ", conditions)).append(";");
        }

        if (!isSearch) {
            query.append(" sort total_rating_count desc;");
        }

        query.append(" limit ").append(searchRequest.getSize()).append(";");
        query.append(" offset ").append(searchRequest.getPage() * searchRequest.getSize()).append(";");

        return executeIgdbQuery(query.toString());
    }

    private void appendListFilter(List<String> conditions, String field, List<String> values) {
        if (values != null && !values.isEmpty()) {
            String valueList = values.stream()
                    .map(v -> "\"" + v.replace("\"", "\\\"") + "\"")
                    .collect(Collectors.joining(","));
            conditions.add(field + " = (" + valueList + ")");
        }
    }

    private void appendCompanyFilter(List<String> conditions, List<String> companies) {
        if (companies != null && !companies.isEmpty()) {
            for (String company : companies) {
                conditions.add("involved_companies.company.name ~ \"" + company.replace("\"", "\\\"") + "\"");
            }
        }
    }

    @Override
    public IgdbGameDto getGameById(Long id) {
        String query = GAME_FIELDS + " where id = " + id + ";";
        return executeIgdbQuery(query).stream().findFirst().orElse(null);
    }

    private List<IgdbGameDto> executeIgdbQuery(String query) {
        return restClient.post()
                .uri(apiUrl + "/games")
                .header("Client-ID", clientId)
                .header("Authorization", "Bearer " + igdbAuthService.getAccessToken())
                .contentType(MediaType.TEXT_PLAIN)
                .body(query)
                .retrieve()
                .body(new ParameterizedTypeReference<List<IgdbGameDto>>() {});
    }
}
