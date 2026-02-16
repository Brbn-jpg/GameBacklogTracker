package com.gametracker.tracker.service.userGame;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gametracker.tracker.dto.userGames.AddUserGameDto;
import com.gametracker.tracker.dto.userGames.UpdateUserGameDto;
import com.gametracker.tracker.dto.userGames.UserBacklogStatsDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;
import com.gametracker.tracker.enums.Status;
import com.gametracker.tracker.exceptions.ForbiddenAccessException;
import com.gametracker.tracker.exceptions.GameAlreadyInBacklogException;
import com.gametracker.tracker.exceptions.GameNotFoundException;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.model.Game;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.model.UserGame;
import com.gametracker.tracker.repository.GameRepository;
import com.gametracker.tracker.repository.UserGameRepository;
import com.gametracker.tracker.repository.UserRepository;
import com.gametracker.tracker.security.JwtService;

import com.gametracker.tracker.dto.IGDB.IgdbGameDto;
import com.gametracker.tracker.service.igdb.IgdbService;
import java.time.Instant;
import java.time.ZoneId;

@Service
public class UserGameServiceImpl implements UserGameService{

    private final UserGameRepository userGameRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final JwtService jwtService;
    private final IgdbService igdbService;

    public UserGameServiceImpl(UserGameRepository userGameRepository, UserRepository userRepository, GameRepository gameRepository, JwtService jwtService, IgdbService igdbService){
        this.userGameRepository = userGameRepository;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.jwtService = jwtService;
        this.igdbService = igdbService;
    }

    @Override
    public List<UserGameResponseDto> getUserGames(String token){
        long userId = findUser(token).getId();
        User user = this.userRepository.findById(userId).orElseThrow();

        List<UserGame> games = this.userGameRepository.findByUser(user);
        return games.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserGameResponseDto addUserGame(AddUserGameDto dto, String token){
        User foundUser = findUser(token);
        
        // Try to find the game locally by appId (IGDB ID)
        Game foundGame = this.gameRepository.findByAppId(dto.getGameId());
        
        // If not found, fetch from IGDB and save
        if (foundGame == null) {
            IgdbGameDto igdbGame = igdbService.getGameById(dto.getGameId());
            if (igdbGame == null) {
                throw new GameNotFoundException("Game with id " + dto.getGameId() + " not found in IGDB");
            }
            
            foundGame = new Game();
            // DO NOT set id manually if using GenerationType.IDENTITY
            foundGame.setAppId(igdbGame.getId()); // Map IGDB ID to appId
            foundGame.setName(igdbGame.getName());
            foundGame.setAbout(igdbGame.getAbout());
            foundGame.setHeaderImage(igdbGame.getCover() != null ? igdbGame.getCover().getUrl().replace("t_thumb", "t_cover_big") : null);
            
            if (igdbGame.getFirstReleaseDate() != null) {
                foundGame.setReleaseDate(Instant.ofEpochSecond(igdbGame.getFirstReleaseDate())
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate());
            }
            
            if (igdbGame.getGenres() != null) {
                foundGame.setGenres(igdbGame.getGenres().stream().map(IgdbGameDto.IgdbGenreDto::getName).collect(Collectors.toList()));
            }
            
            if (igdbGame.getPlatforms() != null) {
                List<String> platformNames = igdbGame.getPlatforms().stream()
                        .map(p -> p.getName().toLowerCase())
                        .collect(Collectors.toList());
                foundGame.setWindows(platformNames.stream().anyMatch(p -> p.contains("windows") || p.contains("pc")));
                foundGame.setMac(platformNames.stream().anyMatch(p -> p.contains("mac")));
                foundGame.setLinux(platformNames.stream().anyMatch(p -> p.contains("linux")));
            }
            
            if (igdbGame.getScreenshots() != null) {
                foundGame.setScreenshots(igdbGame.getScreenshots().stream().map(s -> s.getUrl().replace("t_thumb", "t_screenshot_huge")).collect(Collectors.toList()));
            }
            
            if (igdbGame.getInvolvedCompanies() != null) {
                foundGame.setDevelopers(igdbGame.getInvolvedCompanies().stream()
                        .filter(c -> c.getDeveloper() != null && c.getDeveloper())
                        .map(c -> c.getCompany().getName())
                        .collect(Collectors.toList()));
                foundGame.setPublishers(igdbGame.getInvolvedCompanies().stream()
                        .filter(c -> c.getPublisher() != null && c.getPublisher())
                        .map(c -> c.getCompany().getName())
                        .collect(Collectors.toList()));
            }
            
            foundGame = this.gameRepository.save(foundGame);
        }

        if(this.userGameRepository.existsByUserAndGame(foundUser, foundGame)){
            throw new GameAlreadyInBacklogException("Game with id "+foundGame.getId()+" already exists for user with id "+foundUser.getId());
        }

        UserGame userGame = new UserGame();
        userGame.setUser(foundUser);
        userGame.setGame(foundGame);
        
        Status status = dto.getStatus();
        if (status == null) status = Status.NOT_PLAYED;
        
        userGame.setStatus(status);
        userGame.setHoursPlayed(0.0);
        userGame.setAddedAt(LocalDate.now());
        userGame.setRating(0);

        UserGame savedUserGame = this.userGameRepository.save(userGame);
        return mapToDto(savedUserGame);
    }

    @Override
    @Transactional
    public UserGameResponseDto updateUserGame(long userGameId, UpdateUserGameDto dto, String token){
        UserGame foundUserGame = findUserGame(userGameId);
        long userId = findUser(token).getId();
        checkAccess(foundUserGame, userId);

        if(dto.getStatus() != null){ // could repleace this switch statement with just one line, but i lose the defence
            switch (dto.getStatus()) {
                case PLAYING:
                    foundUserGame.setStatus(dto.getStatus());
                    break;
                case NOT_PLAYED:
                    foundUserGame.setStatus(dto.getStatus());
                    break;
                case COMPLETED:
                    foundUserGame.setStatus(dto.getStatus());
                    break;
                case DITCHED:
                    foundUserGame.setStatus(dto.getStatus());
                    break;
                case WISHLIST:
                    foundUserGame.setStatus(dto.getStatus());
                    foundUserGame.setRating(0);
                    foundUserGame.setHoursPlayed(0.0);
                    break;
                default:
                    throw new IllegalArgumentException("Wrong status");
            }
        }

        if(dto.getRating() != null){
            foundUserGame.setRating(dto.getRating() == 0 ? 0 : dto.getRating());
        }

        if(dto.getHoursPlayed() != null){
            foundUserGame.setHoursPlayed(dto.getHoursPlayed());
        }

        this.userGameRepository.save(foundUserGame);
        return mapToDto(foundUserGame);
    }

    @Override
    @Transactional
    public boolean deleteUserGame(long userGameId, String token){
        UserGame foundUserGame = findUserGame(userGameId);
        long userId = findUser(token).getId();

        checkAccess(foundUserGame, userId);

        this.userGameRepository.delete(foundUserGame);
        return true;
    }

    @Override
    public UserBacklogStatsDto getBacklogStats(String token){
        long userId = findUser(token).getId();
        List<UserGame> userGames = this.userGameRepository.findAllByUserId(userId);

        Map<Status, Long> gamesByStatus = userGames.stream().collect(Collectors.groupingBy(UserGame::getStatus, Collectors.counting()));
        double totalHoursPlayed = userGames.stream().mapToDouble(UserGame::getHoursPlayed).sum();
        double averageRating = userGames.stream().filter(ug -> ug.getRating() > 0).mapToInt(UserGame::getRating).average().orElse(0.0);
        long ownedGamesCount = userGames.stream().filter(ug -> ug.getStatus() != Status.WISHLIST).count();

        UserBacklogStatsDto backlog = new UserBacklogStatsDto();
        backlog.setTotalGames(ownedGamesCount);
        backlog.setGamesByStatus(gamesByStatus);
        backlog.setTotalHoursPlayed(totalHoursPlayed);
        backlog.setAverageRating(averageRating);
        return backlog;
    }

    @Override
    public UserBacklogStatsDto getAllUsersBacklogStats(){
        List<UserGame> userGames = this.userGameRepository.findAll();
        Map<Status, Long> gamesByStatus = userGames.stream().collect(Collectors.groupingBy(UserGame::getStatus, Collectors.counting()));
        double totalHoursPlayed = userGames.stream().mapToDouble(UserGame::getHoursPlayed).sum();
        double averageRating = userGames.stream().filter(ug -> ug.getRating() > 0).mapToInt(UserGame::getRating).average().orElse(0.0);
        
        UserBacklogStatsDto backlog = new UserBacklogStatsDto();
        backlog.setTotalGames(userGames.size());
        backlog.setGamesByStatus(gamesByStatus);
        backlog.setTotalHoursPlayed(totalHoursPlayed);
        backlog.setAverageRating(averageRating);
        return backlog;
    }

    // Helpers
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

    private UserGame findUserGame(long userGameId){
        return this.userGameRepository.findById(userGameId).orElseThrow(() -> new GameNotFoundException("UserGame with id "+userGameId+" was not found"));
    }

    private Boolean checkAccess(UserGame userGame, long userId){
        if (userGame.getUser().getId() != userId) {
            throw new ForbiddenAccessException("You are not authorized to change this resource.");
        }

        return true;
    }

    public UserGameResponseDto mapToDto(UserGame userGame){
        if(userGame == null){
            return null;
        }

        UserGameResponseDto dto = new UserGameResponseDto();

        dto.setId(userGame.getId());
        dto.setStatus(userGame.getStatus());
        dto.setRating(userGame.getRating());
        dto.setAddedAt(userGame.getAddedAt());
        dto.setHoursPlayed(userGame.getHoursPlayed());

        if (userGame.getUser() != null) { 
            dto.setUserId(userGame.getUser().getId());
            dto.setUsername(userGame.getUser().getUsername());
        }

        if (userGame.getGame() != null) {
            dto.setGameId(userGame.getGame().getId());
            dto.setAppId(userGame.getGame().getAppId());
            dto.setGameTitle(userGame.getGame().getName());
            dto.setHeaderImage(userGame.getGame().getHeaderImage());
        }

        return dto;
    }
}
