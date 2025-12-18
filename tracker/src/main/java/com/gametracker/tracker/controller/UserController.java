package com.gametracker.tracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gametracker.tracker.dto.user.UpdateUserEmailDto;
import com.gametracker.tracker.dto.user.UpdateUserPasswordDto;
import com.gametracker.tracker.dto.user.UpdateUserUsernameDto;
import com.gametracker.tracker.dto.user.UserResponseDto;
import com.gametracker.tracker.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable long userId){
        UserResponseDto dto = this.userService.findUserById(userId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping()
    public ResponseEntity<List<UserResponseDto>> getUserByUsername(@RequestParam String username){
        List<UserResponseDto> dto = this.userService.findUserByUsername(username);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        List<UserResponseDto> dto = this.userService.findAllUsers();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getUserProfile(@RequestHeader("Authorization") String token){
        UserResponseDto dto = this.userService.getUserProfile(token);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping("/me/email")
    public ResponseEntity<UserResponseDto> updateUserEmail(@RequestBody UpdateUserEmailDto dto, @RequestHeader("Authorization") String token){
        UserResponseDto userDto = this.userService.updateUserEmail(token, dto);
        return ResponseEntity.ok(userDto);
    }

    @PatchMapping("/me/password")
    public ResponseEntity<UserResponseDto> updateUserPassword(@RequestBody UpdateUserPasswordDto dto, @RequestHeader("Authorization") String token){
        UserResponseDto userDto = this.userService.updateUserPassword(token, dto);
        return ResponseEntity.ok(userDto);
    }

    @PatchMapping("/me/username")
    public ResponseEntity<UserResponseDto> updateUserPassword(@RequestBody UpdateUserUsernameDto dto, @RequestHeader("Authorization") String token){
        UserResponseDto userDto = this.userService.updateUserUsername(token, dto);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String token){
        this.userService.deleteUser(token);
        return ResponseEntity.noContent().build();
    }
}
