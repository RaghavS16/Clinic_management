package com.medical.backend.controller;

import com.medical.backend.models.Staff;
import com.medical.backend.models.Patient;
import com.medical.backend.repository.StaffRepository;
import com.medical.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffRepository staffRepo;

    @Autowired
    private PatientRepository patientRepo;

    // ✅ Get staff info (doctor) by email
   @GetMapping("/email/{email}")
    public ResponseEntity<Object> getDoctorByEmail(@PathVariable String email) {
        Optional<Staff> staffOpt = staffRepo.findByEmail(email);
        if (staffOpt.isPresent()) {
            return ResponseEntity.ok(staffOpt.get());
        } else {
            return ResponseEntity.status(404).body("Doctor not found");
        }
    }

    @GetMapping("/doctors")
    public List<Staff> getAllDoctors() {
        return staffRepo.findByRole("doctor"); // only doctors
    }


    // ✅ Update availability by doctorId
    @PutMapping("/availability/{doctorId}")
    public ResponseEntity<?> updateAvailability(@PathVariable String doctorId, @RequestBody String availability) {
        Optional<Staff> staffOpt = staffRepo.findByDoctorId(doctorId);
        if (staffOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found");
        }

        Staff staff = staffOpt.get();
        staff.setAvailability(availability);
        staffRepo.save(staff);

        return ResponseEntity.ok("Availability updated");
    }

    // ✅ Get all patients assigned to this doctor
    @GetMapping("/{doctorId}/patients")
    public ResponseEntity<?> getPatientsForDoctor(@PathVariable String doctorId) {
        List<Patient> patients = patientRepo.findByDoctorId(doctorId);
        return ResponseEntity.ok(patients);
    }
}
