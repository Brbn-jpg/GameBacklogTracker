package com.gametracker.tracker.enums;

public enum FriendRequestStatus {
    PENDING("pending"),
    ACCEPTED("accepted");

    private final String friendRequestStatus;

    FriendRequestStatus(String friendRequestStatus){
        this.friendRequestStatus = friendRequestStatus;
    }

    public String getFriendRequestStatus(){
        return this.friendRequestStatus;
    }
}
