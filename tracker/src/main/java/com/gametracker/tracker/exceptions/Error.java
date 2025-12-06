package com.gametracker.tracker.exceptions;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Error {
    private int statusCode;
    private String message;
    private Date timestamp = new Date();
}

