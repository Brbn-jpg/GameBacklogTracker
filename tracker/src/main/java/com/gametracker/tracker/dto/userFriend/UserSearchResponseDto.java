package com.gametracker.tracker.dto.userFriend;

import com.gametracker.tracker.enums.FriendRequestStatus;

import lombok.Data;

@Data
public class UserSearchResponseDto {
    private Long id;
    private String username;
    private FriendRequestStatus status;
}
