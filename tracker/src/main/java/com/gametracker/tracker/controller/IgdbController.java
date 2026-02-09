package com.gametracker.tracker.controller;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;
import com.gametracker.tracker.dto.IGDB.IgdbSearchRequestDto;
import com.gametracker.tracker.model.Game;
import com.gametracker.tracker.service.igdb.IgdbMapper;
import com.gametracker.tracker.service.igdb.IgdbService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/igdb")
public class IgdbController {

    private final IgdbService igdbService;
    private final IgdbMapper igdbMapper;

    public IgdbController(IgdbService igdbService, IgdbMapper igdbMapper) {
        this.igdbService = igdbService;
        this.igdbMapper = igdbMapper;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Game>> searchGames(@ModelAttribute IgdbSearchRequestDto searchRequest) {
        List<IgdbGameDto> igdbGames = igdbService.searchGames(searchRequest);
        
        List<Game> mappedGames = igdbGames.stream()
                .map(igdbMapper::toEntity)
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(mappedGames);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        IgdbGameDto igdbGame = igdbService.getGameById(id);
        if (igdbGame == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(igdbMapper.toEntity(igdbGame));
    }
}
