package com.gametracker.tracker.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gametracker.tracker.dto.user.ListUserResponseDto;
import com.gametracker.tracker.dto.userFriend.AddUserFriendDto;
import com.gametracker.tracker.dto.userFriend.UserFriendDto;
import com.gametracker.tracker.dto.userFriend.UserSearchResponseDto;
import com.gametracker.tracker.service.UserFriendService;

@RestController
@RequestMapping("/userfriend")
public class UserFriendController {
    private final UserFriendService userFriendService;

    public UserFriendController(UserFriendService userFriendService){
        this.userFriendService = userFriendService;
    }

    @PostMapping("/add")
    public ResponseEntity<UserFriendDto> addFriend(@RequestHeader("Authorization") String token, @RequestBody AddUserFriendDto dto){
        UserFriendDto request = this.userFriendService.addFriend(dto, token);
        return ResponseEntity.ok(request);
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<UserFriendDto> declineRequest(@RequestHeader("Authorization") String token, @PathVariable Long id){
        UserFriendDto request = this.userFriendService.declineRequest(id, token);
        return ResponseEntity.ok(request);
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<UserFriendDto> acceptRequest(@RequestHeader("Authorization") String token, @PathVariable Long id){
        UserFriendDto request = this.userFriendService.acceptRequest(id, token);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFriend(@RequestHeader("Authorization") String token, @RequestBody AddUserFriendDto dto){
        this.userFriendService.removeFriend(dto, token);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/friendRequests")
    public ResponseEntity<List<ListUserResponseDto>> getFriendRequests(@RequestHeader("Authorization") String token){
        List<ListUserResponseDto> friendsRequests = this.userFriendService.getFriendRequests(token);
        return ResponseEntity.ok(friendsRequests);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ListUserResponseDto>> getFriendsList(@RequestHeader("Authorization") String token){
        List<ListUserResponseDto> friends = this.userFriendService.getFriendsList(token);
        return ResponseEntity.ok(friends);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserSearchResponseDto>> searchUsers(@RequestHeader("Authorization") String token, @RequestParam(required = false) String query, Pageable pageable) {
        Page<UserSearchResponseDto> result = this.userFriendService.browsePeople(query, token, pageable);
        return ResponseEntity.ok(result);
    }
}
