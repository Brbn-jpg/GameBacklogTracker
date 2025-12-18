package com.gametracker.tracker.enums;

public enum Role {
    ADMIN("Admin"),
    USER("User");

    private final String role;

    Role(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
