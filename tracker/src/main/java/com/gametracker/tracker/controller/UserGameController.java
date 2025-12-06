package com.gametracker.tracker.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gametracker.tracker.dto.userGames.AddUserGameDto;
import com.gametracker.tracker.dto.userGames.UpdateUserGameDto;
import com.gametracker.tracker.dto.userGames.UserBacklogStatsDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;
import com.gametracker.tracker.service.UserGameService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/usergames")
public class UserGameController {
    private final UserGameService userGameService;

    public UserGameController(UserGameService userGameService){
        this.userGameService = userGameService;
    }

    @GetMapping
    public ResponseEntity<List<UserGameResponseDto>> getUserGames(@RequestHeader("Authorization") String token){
        List<UserGameResponseDto> foundUserGames = this.userGameService.getUserGames(token);
        return ResponseEntity.ok(foundUserGames);
    }

    @GetMapping("/stats")
    public ResponseEntity<UserBacklogStatsDto> getBacklogStats(@RequestHeader("Authorization") String token){
        UserBacklogStatsDto dto = this.userGameService.getBacklogStats(token);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<UserGameResponseDto> addUserGame(@Valid @RequestBody AddUserGameDto dto, @RequestHeader("Authorization") String token){
        UserGameResponseDto userGame = this.userGameService.addUserGame(dto.getGameId(), token);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(userGame.getId())
                .toUri();

        return ResponseEntity.created(location).body(userGame);
    }

    @PatchMapping("/{userGameId}")
    public ResponseEntity<UserGameResponseDto> updateUserGame(@PathVariable long userGameId, @Valid @RequestBody UpdateUserGameDto dto, @RequestHeader("Authorization") String token){
        UserGameResponseDto userGame = this.userGameService.updateUserGame(userGameId, dto, token);
        return ResponseEntity.ok(userGame);
    }

    @DeleteMapping("/{userGameId}")
    public ResponseEntity<Void> deleteUserGame(@PathVariable long userGameId, @RequestHeader("Authorization") String token){
        boolean deleted = this.userGameService.deleteUserGame(userGameId, token);
        if(deleted){
            return ResponseEntity.noContent().build();
        } 

        return ResponseEntity.notFound().build();
    }
}
