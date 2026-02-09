package com.gametracker.tracker.service.game;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.LocalDate;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class GameServiceImpl implements GameService {

    @PersistenceContext
    private EntityManager entityManager;
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
        return this.gameRepository.findAll(spec, pageable);
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
    public List<String> findDistinctGenres(){
        return this.gameRepository.findDistinctGenres();
    }

    @Override
    public List<String> findDistinctCategories(){
        return this.gameRepository.findDistinctCategories();
    }

    @Override
    public List<String> findDistinctTags(){
        return this.gameRepository.findDistinctTags();
    }

@Override
    @Transactional
    public Integer uploadCsv(MultipartFile file, String token) {
        findUser(token);
        System.out.println("Started uploading (Stream mode)");

        int batchSize = 500;
        int totalSaved = 0;
        List<Game> batch = new ArrayList<>();

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

            Iterator<GameCsvDto> csvIterator = csvToBean.iterator();

            while (csvIterator.hasNext()) {
                GameCsvDto dto = csvIterator.next();
                
                if (dto != null && dto.getAppId() != null) {
                    batch.add(dto.toGameEntity());
                }

                if (batch.size() >= batchSize) {
                    saveBatch(batch);
                    totalSaved += batch.size();
                    batch.clear(); 
                    System.out.println("Saved chunk. Progress: " + totalSaved);
                }
            }

            if (!batch.isEmpty()) {
                saveBatch(batch);
                totalSaved += batch.size();
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to parse CSV file", e);
        }

        System.out.println("Finished. Total: " + totalSaved);
        return totalSaved;
    }

    private void saveBatch(List<Game> batch) {
        gameRepository.saveAll(batch);
        entityManager.flush();
        entityManager.clear();
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
