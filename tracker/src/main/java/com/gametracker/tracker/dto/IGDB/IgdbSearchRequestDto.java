package com.gametracker.tracker.dto.IGDB;

import lombok.Data;
import java.util.List;

@Data
public class IgdbSearchRequestDto {
    private String name;
    private List<String> genres;
    private List<String> platforms;
    private List<String> developers;
    private List<String> publishers;
    private List<String> categories;
    private int page = 0;
    private int size = 12;
}
