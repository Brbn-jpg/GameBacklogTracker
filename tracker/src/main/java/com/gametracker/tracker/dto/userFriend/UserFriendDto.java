package com.gametracker.tracker.dto.userFriend;

import java.time.LocalDate;

import com.gametracker.tracker.dto.user.UserResponseDto;
import com.gametracker.tracker.enums.FriendRequestStatus;

import lombok.Data;

@Data
public class UserFriendDto {
    private Long id;
    private UserResponseDto friend;
    private FriendRequestStatus status;
    private boolean amIRequester;
    private LocalDate invitedAt;
}
