package com.gametracker.tracker.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gametracker.tracker.dto.auth.LoginDto;
import com.gametracker.tracker.dto.auth.RegisterDto;
import com.gametracker.tracker.dto.auth.TokenDto;
import com.gametracker.tracker.dto.auth.VerifyUserDto;
import com.gametracker.tracker.dto.auth.passwordReset.ForgotPasswordRequestDto;
import com.gametracker.tracker.dto.auth.passwordReset.ResetPasswordRequestDto;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.security.JwtService;
import com.gametracker.tracker.security.UserDetailService;
import com.gametracker.tracker.service.user.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager manager;
    private final JwtService jwtService;
    private final UserDetailService userDetailService;

    public AuthController(UserService userService, AuthenticationManager manager, JwtService jwtService, UserDetailService userDetailService){
        this.userService = userService;
        this.manager = manager;
        this.jwtService = jwtService;
        this.userDetailService = userDetailService;
    }

    @PostMapping("/login")
    public TokenDto login(@Valid @RequestBody LoginDto dto){
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
            TokenDto token = new TokenDto();
            token.setToken(jwtService.generateToken(userDetailService.loadUserByUsername(dto.getEmail())));
            return token;
        } catch (BadCredentialsException e){
            throw new UserNotFoundException("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDto dto){
        this.userService.registerUser(dto);
    }

    @PostMapping("/verify")
    public TokenDto verify(@RequestBody @Valid VerifyUserDto dto){
        return this.userService.verifyUser(dto);
    }

    @PostMapping("/forgot-password")
    public void forgotPasswordRequest(@RequestBody @Valid ForgotPasswordRequestDto dto){
        this.userService.processForgotPassword(dto.getEmail());
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody @Valid ResetPasswordRequestDto dto){
        this.userService.resetPassword(dto.getToken(), dto.getNewPassword());
    }
}
