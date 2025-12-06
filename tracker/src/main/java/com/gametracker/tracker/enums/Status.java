package com.gametracker.tracker.enums;

public enum Status {
    PLAYING("Playing"),
    NOT_PLAYED("Not played"),
    COMPLETED("Completed"),
    DITCHED("Ditched");

    private final String statusName;

    Status(String statusName){
        this.statusName = statusName;
    }

    public String getStatusName() {
        return statusName;
    }
}
