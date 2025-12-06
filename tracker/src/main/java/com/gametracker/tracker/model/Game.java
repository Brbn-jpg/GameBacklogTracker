package com.gametracker.tracker.model;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Table(name = "games")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(name = "appId")
    private Long appId;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(name = "headerImage", columnDefinition = "TEXT")
    private String headerImage;

    @Column(name = "price")
    private Double price;

    @Column(name = "releaseDate")
    private LocalDate releaseDate;

    @ElementCollection
    @Column(name = "developer")
    private List<String> developers;

    @ElementCollection
    @Column(name = "publisher")
    private List<String> publishers;

    @Column(name = "windows")
    private Boolean windows;

    @Column(name = "mac")
    private Boolean mac;

    @Column(name = "linux")
    private Boolean linux;

    @ElementCollection
    @Column(name = "genre")
    private List<String> genres;

    @ElementCollection
    @Column(name = "category")
    private List<String> categories;

    @ElementCollection
    @Column(name = "tag")
    private List<String> tags;

    @Column(name = "about", columnDefinition = "TEXT")
    private String about;

    @Column(name = "screenshots")
    private List<String> screenshots;

    @Column(name = "movies")
    private List<String> movies;

    @ElementCollection
    @Column(name = "supportedLanguage")
    private List<String> supportedLanguages;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    private final List<UserGame> userGames = new ArrayList<>();
}
