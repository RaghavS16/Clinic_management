package com.medical.backend.controller;

import com.medical.backend.models.Patient;
import com.medical.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;


    @GetMapping("/all")
    public ResponseEntity<?> getAllPatients() {
        return ResponseEntity.ok(patientRepository.findAll());
    }
    

    @PutMapping("/status/{token}")
public ResponseEntity<?> updatePatientStatus(@PathVariable String token, @RequestBody String status) {
    Optional<Patient> patientOpt = patientRepository.findByToken(token);

    if (patientOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
    }

    Patient patient = patientOpt.get();
    patient.setStatus(status); // 🩺 Only doctor updates this
    patientRepository.save(patient);

    return ResponseEntity.ok("Patient status updated by doctor");
}


    
    @PostMapping("/add")
public ResponseEntity<?> addPatient(@RequestBody Patient patients) {
    System.out.println("✅ Token: " + patients.getToken());
    System.out.println("✅ Date: " + patients.getDate());

    if (patientRepository.existsByTokenAndDate(patients.getToken(), patients.getDate())) {
        return ResponseEntity.badRequest().body("Token already exists for this date");
    }

    

    patientRepository.save(patients);
    return ResponseEntity.ok("Patient added successfully");
}


}
