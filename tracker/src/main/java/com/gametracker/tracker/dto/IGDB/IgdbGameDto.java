package com.gametracker.tracker.dto.IGDB;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class IgdbGameDto {
    private Long id;
    private String name;
    
    @JsonProperty("summary")
    private String about;

    @JsonProperty("first_release_date")
    private Long firstReleaseDate;

    private IgdbCoverDto cover;
    private List<IgdbGenreDto> genres;
    private List<IgdbPlatformDto> platforms;
    private List<IgdbScreenshotDto> screenshots;

    @JsonProperty("involved_companies")
    private List<IgdbInvolvedCompanyDto> involvedCompanies;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbCoverDto {
        private String url;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbGenreDto {
        private String name;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbPlatformDto {
        private String name;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbScreenshotDto {
        private String url;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbInvolvedCompanyDto {
        private Boolean developer;
        private Boolean publisher;
        private IgdbCompanyDto company;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IgdbCompanyDto {
        private String name;
    }
}