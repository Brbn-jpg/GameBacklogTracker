package com.gametracker.tracker.service.email;

public interface EmailService {
    void sendVerificationEmail(String to, String code);
    void sendPasswordResetEmail(String to, String token);
    String generateCode();
}
