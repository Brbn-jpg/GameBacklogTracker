package com.gametracker.tracker.dto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import java.util.stream.Collectors;

import com.gametracker.tracker.model.Game;
import com.opencsv.bean.CsvBindAndSplitByName;
import com.opencsv.bean.CsvBindByName;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameCsvDto {
    @CsvBindByName(column = "AppID")
    private Long appId;

    @CsvBindByName(column = "Name")
    private String name;

    @CsvBindByName(column = "Header Image")
    private String headerImage;

    @CsvBindByName(column = "Price")
    private String price;

    @CsvBindByName(column = "Release date")
    private String releaseDate;

    @CsvBindAndSplitByName(column = "Developers", elementType = String.class, splitOn = ",")
    private List<String> developers;

    @CsvBindAndSplitByName(column = "Publishers", elementType = String.class, splitOn = ",")
    private List<String> publishers;

    @CsvBindByName(column = "Windows")
    private Boolean windows;

    @CsvBindByName(column = "Mac")
    private Boolean mac;

    @CsvBindByName(column = "Linux")
    private Boolean linux;

    @CsvBindAndSplitByName(column = "Genres", elementType = String.class, splitOn = ",")
    private List<String> genres;

    @CsvBindAndSplitByName(column = "Categories", elementType = String.class, splitOn = ",")
    private List<String> categories;

    @CsvBindAndSplitByName(column = "Tags", elementType = String.class, splitOn = ",")
    private List<String> tags;

    @CsvBindByName(column = "About the game")
    private String about;

    @CsvBindAndSplitByName(column = "Screenshots", elementType = String.class, splitOn = ",")
    private List<String> screenshots;

    @CsvBindAndSplitByName(column = "Movies", elementType = String.class, splitOn = ",")
    private List<String> movies;


    @CsvBindAndSplitByName(column = "Supported languages", elementType = String.class, splitOn = ",")
    private List<String> supportedLanguages;

    public Game toGameEntity() {
        return Game.builder()
                .appId(this.appId)
                .name(normalizeString(this.name))
                .headerImage(this.headerImage)
                .price(convertPriceToDouble())
                .releaseDate(convertReleaseDateToLocalDate())
                .developers(normalizeList(this.developers))
                .publishers(normalizeList(this.publishers))
                .windows(Boolean.TRUE.equals(this.windows))
                .mac(Boolean.TRUE.equals(this.mac))
                .linux(Boolean.TRUE.equals(this.linux))
                .genres(normalizeList(this.genres))
                .categories(normalizeList(this.categories))
                .tags(normalizeList(this.tags))
                .screenshots(this.screenshots)
                .movies(this.movies)
                .about(this.about)
                .supportedLanguages(normalizeLanguageList(this.supportedLanguages))
                .build();
    }

    // Helper methods
    
    private Double convertPriceToDouble() {
        if (StringUtils.isBlank(this.price) || this.price.toLowerCase().contains("free")) {
            return 0.0;
        }
        try {
            String cleanPrice = this.price.replaceAll("[^\\d,.]", "").replace(',', '.');
            return Double.parseDouble(cleanPrice);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    private LocalDate convertReleaseDateToLocalDate() {
        if (StringUtils.isBlank(this.releaseDate)) {
            return null;
        }
        
        String trimmedDate = this.releaseDate.trim();
        
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH);
        
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("d MMM, yyyy", Locale.ENGLISH);
        
        List<DateTimeFormatter> formatters = List.of(
            formatter1,
            formatter2,
            DateTimeFormatter.ISO_LOCAL_DATE  
        );
        
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(trimmedDate, formatter);
            } catch (DateTimeParseException ignored) {
            }
        }

        // month validation
        try {
            DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("MMM yyyy", Locale.ENGLISH);
            YearMonth yearMonth = YearMonth.parse(trimmedDate, monthYearFormatter);
            return yearMonth.atDay(1);
        } catch (DateTimeParseException ignored) {
        }
        
        // year validation
        try {
            int year = Integer.parseInt(trimmedDate);
            return LocalDate.of(year, 1, 1);
        } catch (NumberFormatException ignored) {
        }
        
        System.err.println("Could not parse date: " + this.releaseDate);
        return null;
    }

    private String normalizeString(String input) {
        if (input == null || input.isBlank()) {
            return null;
        }
        // 1. Removes leading and trailing whitespace.
        // 2. Replaces all sequences of whitespace characters (spaces, tabs, etc.) with a single space.
        return input.trim().replaceAll("\\s+", " ");
    }

    private List<String> normalizeList(List<String> inputList) {
        if (inputList == null || inputList.isEmpty()) {
            return null;
        }
        return inputList.stream()
                .map(this::normalizeString)
                .filter(s -> s != null && !s.isEmpty())
                .collect(Collectors.toList());
    }

    private List<String> normalizeLanguageList(List<String> inputList) {
        if (inputList == null || inputList.isEmpty()) {
            return null;
        }
        // 1. We combine potentialy bugged elements into one string
        // Example: ["['English'", " 'Polish']"] -> "['English', 'Polish']"
        String combinedString = String.join(",", inputList);

        // 2. Remove python list chars [, ], '
        String cleanedString = combinedString.replace("[", "")
                                             .replace("]", "")
                                             .replace("'", "");

        // 3. Divide cleaned string by , and then we normalize every element
        return Arrays.stream(cleanedString.split(","))
                .map(this::normalizeString)
                .filter(s -> s != null && !s.isEmpty())
                .collect(Collectors.toList());
    }
}
