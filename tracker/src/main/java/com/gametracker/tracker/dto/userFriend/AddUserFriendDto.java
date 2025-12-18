package com.gametracker.tracker.dto.userFriend;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddUserFriendDto {
    @NotNull
    private String targetUserUsername;
}
