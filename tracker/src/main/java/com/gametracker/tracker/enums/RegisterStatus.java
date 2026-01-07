package com.gametracker.tracker.enums;

public enum RegisterStatus {
    VERIFIED("Verified"),
    NOT_VERIFIED("Not verified");

    private final String registerStatusName;

    RegisterStatus(String registerStatusName){
        this.registerStatusName = registerStatusName;
    }

    public String getRegisterStatusName(){
        return this.registerStatusName;
    }
}
