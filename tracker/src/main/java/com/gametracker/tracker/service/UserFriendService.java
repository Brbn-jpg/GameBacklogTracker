package com.gametracker.tracker.service;

import java.util.List;

import com.gametracker.tracker.dto.user.ListUserResponseDto;
import com.gametracker.tracker.dto.userFriend.AddUserFriendDto;
import com.gametracker.tracker.dto.userFriend.UserFriendDto;

public interface UserFriendService {
    UserFriendDto addFriend(AddUserFriendDto dto, String token);
    UserFriendDto declineRequest(Long userFriendId, String token);
    UserFriendDto acceptRequest(Long userFriendId, String token);
    void removeFriend(AddUserFriendDto dto, String token);
    List<ListUserResponseDto> getFriendsList(String token);
    List<ListUserResponseDto> getFriendRequests(String token);
}