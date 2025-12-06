package com.gametracker.tracker.security;

import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.gametracker.tracker.exceptions.UserAlreadyExistsException;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {
    private final UserRepository userRepository;
    private static final long EXPIRATION_DATE = TimeUnit.HOURS.toMillis(96);

    @Value("${JWT_KEY}")
    private String jwtKey;

    public JwtService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public String generateToken(UserDetails user){
        User foundUser = userRepository.findByUsername(user.getUsername())
                                        .orElseThrow(() -> new UserAlreadyExistsException("User "+user.getUsername()+" already exists" ));

        Map<String, Object> claims = new HashMap<>();
        claims.put("provider", "GameBacklogTracker");
        claims.put("id", foundUser.getId());
        claims.put("role", foundUser.getRole());
        return Jwts.builder()
                    .claims(claims)
                    .subject(foundUser.getEmail())
                    .issuedAt(Date.from(Instant.now()))
                    .expiration(Date.from(Instant.now().plusMillis(EXPIRATION_DATE)))
                    .signWith(generateToken())
                    .compact();
    }

    private SecretKey generateToken(){
        byte[] key = Base64.getDecoder().decode(jwtKey);
        return Keys.hmacShaKeyFor(key);
    }

    private Claims getClaims(String jwt){
        return Jwts.parser().verifyWith(generateToken()).build().parseSignedClaims(jwt).getPayload();
    }

    public String extractUsername(String jwt){
        Claims claims = getClaims(jwt);
        return claims.getSubject();
    }

    public long extractId(String jwt){
        Claims claims = getClaims(jwt);
        return Integer.parseInt(claims.get("id").toString());
    }

    public boolean isTokenValid(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getExpiration().after(Date.from(Instant.now()));
    }
}
