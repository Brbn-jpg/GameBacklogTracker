package com.gametracker.tracker.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.LocalDate;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gametracker.tracker.dto.GameCsvDto;
import com.gametracker.tracker.exceptions.ForbiddenAccessException;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.model.Game;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.repository.GameRepository;
import com.gametracker.tracker.repository.GameSpecification;
import com.gametracker.tracker.repository.UserRepository;
import com.gametracker.tracker.security.JwtService;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.RFC4180Parser;
import com.opencsv.RFC4180ParserBuilder;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import com.opencsv.enums.CSVReaderNullFieldIndicator;

import jakarta.transaction.Transactional;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public GameServiceImpl(GameRepository gameRepository, JwtService jwtService, UserRepository userRepository){
        this.gameRepository = gameRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Game> findGames(String name, Double price, LocalDate releaseDate, List<String> developers, List<String> publishers, Boolean windows, Boolean mac, Boolean linux, List<String> genres, List<String> categories, List<String> tags, Pageable pageable) {
        Specification<Game> spec = GameSpecification.findByCriteria(name, price, releaseDate, developers, publishers, windows, mac, linux, genres, categories, tags);
        return gameRepository.findAll(spec, pageable);
    }

    @Override
    public Game getGameById(long id){
        return this.gameRepository.findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public void deleteGame(long id, String token){
        findUser(token);
        this.gameRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Integer uploadCsv(MultipartFile file, String token) {
        findUser(token);

        System.out.println("Started uploading");
        Set<Game> games;
        try {
            games = parseCsv(file);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }
        this.gameRepository.saveAll(games);
        System.out.println("Finished uploading");
        return games.size();
    }

    private Set<Game> parseCsv(MultipartFile file) throws IOException {
        System.out.println("started parsing");

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<GameCsvDto> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(GameCsvDto.class);

            RFC4180Parser parser = new RFC4180ParserBuilder()
                    .withQuoteChar('"')
                    .build();

            CSVReader csvReader = new CSVReaderBuilder(reader)
                    .withCSVParser(parser)
                    .withFieldAsNull(CSVReaderNullFieldIndicator.BOTH)
                    .withMultilineLimit(100) 
                    .build();

            CsvToBean<GameCsvDto> csvToBean = new CsvToBeanBuilder<GameCsvDto>(csvReader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withIgnoreLeadingWhiteSpace(true)
                    .withThrowExceptions(false)
                    .build();

            List<GameCsvDto> parsedDtos = csvToBean.parse();

            csvToBean.getCapturedExceptions().forEach(ex -> {
                System.err.println("Line " + ex.getLineNumber() + ": " + ex.getMessage());
            });

            System.out.println("Parsed DTOs: " + parsedDtos.size());

            return parsedDtos.stream()
                    .filter(dto -> dto != null && dto.getAppId() != null)  
                    .map(GameCsvDto::toGameEntity)
                    .collect(Collectors.toSet());
        }
    }

    private User findUser(String token){
        String jwt = token;

        if(token != null && token.startsWith("Bearer ")){
            jwt = token.substring(7);
        }

        if(!jwtService.isTokenValid(jwt)){
            throw new ForbiddenAccessException("Invalid or expired token");
        }

        long userId = jwtService.extractId(jwt);
        return this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with userId "+userId+" was not found"));
    }
}
