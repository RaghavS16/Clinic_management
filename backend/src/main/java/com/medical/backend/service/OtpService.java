package com.medical.backend.service;

import com.medical.backend.models.OtpCode;
import com.medical.backend.repository.OtpCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpCodeRepository otpRepo;

    public void sendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Save OTP to database
        OtpCode otpCode = new OtpCode();
        otpCode.setEmail(email);
        otpCode.setCode(otp);
        otpCode.setCreatedAt(LocalDateTime.now());
        otpRepo.save(otpCode);

        // Send Email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Medical Portal OTP");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String code) {
        Optional<OtpCode> otpOpt = otpRepo.findByEmailAndCode(email, code);
        return otpOpt.isPresent();
    }
}
