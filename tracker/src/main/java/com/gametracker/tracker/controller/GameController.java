package com.gametracker.tracker.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gametracker.tracker.model.Game;
import com.gametracker.tracker.service.GameService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping()
    public ResponseEntity<?> getGames(@RequestParam(name = "page", defaultValue = "0") int page,
                                      @RequestParam(name = "size", defaultValue = "12") int size,
                                      @RequestParam(name = "name", required = false) String name,
                                      @RequestParam(name = "price", required = false) Double price,
                                      @RequestParam(name = "releaseDate", required = false) LocalDate releaseDate,
                                      @RequestParam(name = "developers", required = false) List<String> developers,
                                      @RequestParam(name = "publishers", required = false) List<String> publishers,
                                      @RequestParam(name = "windows", required = false) Boolean windows,
                                      @RequestParam(name = "mac", required = false) Boolean mac,
                                      @RequestParam(name = "linux", required = false) Boolean linux,
                                      @RequestParam(name = "genres", required = false) List<String> genres,
                                      @RequestParam(name = "categories", required = false) List<String> categories,
                                      @RequestParam(name = "tags", required = false) List<String> tags) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Game> gamesPage = gameService.findGames(name, price, releaseDate, developers, publishers, windows, mac, linux, genres, categories, tags, pageable);
        return ResponseEntity.ok(gamesPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Game game = this.gameService.getGameById(id);
        if(game != null){
            return ResponseEntity.ok(game);
        } 
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id, @RequestHeader("Authorization") String token){
        this.gameService.deleteGame(id, token);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/uploadCsv", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadCsvFile(@RequestPart("file") MultipartFile file, @RequestHeader("Authorization") String token) throws IOException {
        return ResponseEntity.ok(this.gameService.uploadCsv(file, token));
    }
    
}
