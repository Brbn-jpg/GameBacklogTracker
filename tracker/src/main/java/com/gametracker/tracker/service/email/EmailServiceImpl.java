package com.gametracker.tracker.service.email;

import java.security.SecureRandom;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{
    private JavaMailSender mailSender;
    private static final SecureRandom secureRandom = new SecureRandom();

    @org.springframework.beans.factory.annotation.Value("${app.frontend.url}")
    private String frontendUrl;

    public EmailServiceImpl(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Override
    public void sendVerificationEmail(String to, String code){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@gamelog.com");
        message.setTo(to);
        message.setSubject("Verification code");
        message.setText("Hello! Your verification code is: " + code + "\nCode will expire in 15 minutes.");
        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetEmail(String to, String token){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@gamelog.com");
        message.setTo(to);
        message.setSubject("Reset your password");
        message.setText("Hello! Here is a link to reset your password: "+generateLink(token)+"\n Link will expire in 15 minutes.");
        mailSender.send(message);
    }

    @Override
    public String generateCode(){
        int code = secureRandom.nextInt(1000000);
        return String.format("%06d", code);
    }

    private String generateLink(String token){
        return frontendUrl + "/reset-password?token=" + token;
    }
}
