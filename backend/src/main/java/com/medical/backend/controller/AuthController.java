package com.medical.backend.controller;

import com.medical.backend.models.Staff;
import com.medical.backend.repository.StaffRepository;
import com.medical.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend access
public class AuthController {

    @Autowired
    private StaffRepository staffRepo;

    @Autowired
    private OtpService otpService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        otpService.sendOtp(email);
        return ResponseEntity.ok("OTP sent to " + email);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Staff staff) {
    Optional<Staff> existing = staffRepo.findByEmail(staff.getEmail());
    if (existing.isPresent()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
    }

    // Encrypt password
    staff.setPassword(passwordEncoder.encode(staff.getPassword()));

    staffRepo.save(staff);
    return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");
    String role = body.get("role");

    Optional<Staff> userOpt = staffRepo.findByEmail(email);
    if (userOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    Staff user = userOpt.get();

    if (!passwordEncoder.matches(password, user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
    }

    if (!user.getRole().equalsIgnoreCase(role)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong role");
    }

    return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");

        if (otpService.verifyOtp(email, otp)) {
            return ResponseEntity.ok("OTP verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("password");

        Optional<Staff> staffOpt = staffRepo.findByEmail(email);
        if (staffOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Staff staff = staffOpt.get();
        staff.setPassword(passwordEncoder.encode(newPassword));
        staffRepo.save(staff);
        return ResponseEntity.ok("Password reset successful");
    }
}
