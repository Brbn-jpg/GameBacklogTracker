package com.gametracker.tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gametracker.tracker.model.User;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User>{
    User findByUsernameIgnoreCase(String username);
    Optional<User> findByUsername(String username);
    List<User> findByUsernameContaining(String username);
    Optional<User> findByEmail(String email);
}
