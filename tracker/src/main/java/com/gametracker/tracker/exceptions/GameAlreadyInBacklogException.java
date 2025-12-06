package com.gametracker.tracker.exceptions;

public class GameAlreadyInBacklogException extends RuntimeException{
    public GameAlreadyInBacklogException(String message){
        super(message);
    }
}
