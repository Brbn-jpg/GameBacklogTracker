package com.gametracker.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gametracker.tracker.model.Game;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.model.UserGame;

import java.util.List;


public interface UserGameRepository extends JpaRepository<UserGame, Long>{
    List<UserGame> findByUser(User user);
    Boolean existsByUserAndGame(User user, Game game);
    List<UserGame> findAllByUserId(long userId);
}
