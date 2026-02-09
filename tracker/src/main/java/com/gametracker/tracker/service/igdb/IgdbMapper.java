package com.gametracker.tracker.service.igdb;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;
import com.gametracker.tracker.model.Game;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class IgdbMapper {

    public Game toEntity(IgdbGameDto dto) {
        if (dto == null) return null;

        return Game.builder()
                .appId(dto.getId())
                .name(dto.getName())
                .about(dto.getAbout())
                .releaseDate(mapDate(dto.getFirstReleaseDate()))
                .headerImage(mapImageUrl(dto.getCover() != null ? dto.getCover().getUrl() : null, "t_cover_big"))
                .genres(dto.getGenres() != null ? 
                        dto.getGenres().stream().map(IgdbGameDto.IgdbGenreDto::getName).collect(Collectors.toList()) : new ArrayList<>())
                .screenshots(dto.getScreenshots() != null ? 
                        dto.getScreenshots().stream().map(s -> mapImageUrl(s.getUrl(), "t_720p")).collect(Collectors.toList()) : new ArrayList<>())
                .developers(mapCompanies(dto, true))
                .publishers(mapCompanies(dto, false))
                .windows(hasPlatform(dto, "PC (Microsoft Windows)"))
                .mac(hasPlatform(dto, "Mac"))
                .linux(hasPlatform(dto, "Linux"))
                .build();
    }

    private LocalDate mapDate(Long timestamp) {
        if (timestamp == null) return null;
        return Instant.ofEpochSecond(timestamp).atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private String mapImageUrl(String url, String size) {
        if (url == null) return null;
        return "https:" + url.replace("t_thumb", size);
    }

    private List<String> mapCompanies(IgdbGameDto dto, boolean isDeveloper) {
        if (dto.getInvolvedCompanies() == null) return new ArrayList<>();
        return dto.getInvolvedCompanies().stream()
                .filter(c -> isDeveloper ? (c.getDeveloper() != null && c.getDeveloper()) : (c.getPublisher() != null && c.getPublisher()))
                .filter(c -> c.getCompany() != null)
                .map(c -> c.getCompany().getName())
                .collect(Collectors.toList());
    }

    private Boolean hasPlatform(IgdbGameDto dto, String platformName) {
        if (dto.getPlatforms() == null) return false;
        return dto.getPlatforms().stream()
                .anyMatch(p -> p.getName() != null && p.getName().contains(platformName));
    }
}
