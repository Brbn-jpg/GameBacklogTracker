package com.gametracker.tracker.service;

import java.util.List;

import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.gametracker.tracker.model.Game;

public interface GameService {
    Page<Game> findGames(String name, Double price, LocalDate releaseDate, List<String> developers, List<String> publishers, Boolean windows, Boolean mac, Boolean linux, List<String> genres, List<String> categories, List<String> tags, Pageable pageable);
    Game getGameById(long id);
    void deleteGame(long id, String token);
    List<String> findDistinctGenres();
    List<String> findDistinctCategories();
    List<String> findDistinctTags();
    Integer uploadCsv(MultipartFile file, String token);
}
