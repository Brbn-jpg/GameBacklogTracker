package com.gametracker.tracker.exceptions;

public class UserFriendNotFoundException extends RuntimeException{
    public UserFriendNotFoundException(String message){
        super(message);
    }
}
