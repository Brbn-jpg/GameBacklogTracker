package com.gametracker.tracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

import com.gametracker.tracker.enums.Status;


@Entity
@Data
@Table(name = "usergame")
@AllArgsConstructor
@NoArgsConstructor
public class UserGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "gameId")
    private Game game;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
    
    @Column(name = "addedAt")
    private LocalDate addedAt;

    @Column(name = "hoursPlayed")
    private Double hoursPlayed;

    @Column(name = "rating")
    private int rating;
}
