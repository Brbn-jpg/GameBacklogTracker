package com.gametracker.tracker.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gametracker.tracker.model.Game;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long>, JpaSpecificationExecutor<Game> {
}
