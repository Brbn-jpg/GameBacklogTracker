package com.gametracker.tracker.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.gametracker.tracker.model.Game;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long>, JpaSpecificationExecutor<Game> {
    @Query("SELECT DISTINCT g FROM Game game JOIN game.genres g")
    List<String> findDistinctGenres();

    @Query("SELECT DISTINCT c FROM Game game JOIN game.categories c")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT t FROM Game game JOIN game.tags t")
    List<String> findDistinctTags();
}
