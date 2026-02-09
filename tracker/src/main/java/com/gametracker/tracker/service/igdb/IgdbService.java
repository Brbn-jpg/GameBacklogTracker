package com.gametracker.tracker.service.igdb;

import com.gametracker.tracker.dto.IGDB.IgdbSearchRequestDto;

import java.util.List;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;

public interface IgdbService {
    List<IgdbGameDto> searchGames(IgdbSearchRequestDto searchRequest);
    IgdbGameDto getGameById(Long id);
}
