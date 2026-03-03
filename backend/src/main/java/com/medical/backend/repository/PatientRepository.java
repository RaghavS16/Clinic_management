package com.medical.backend.repository;

import com.medical.backend.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional; // 👈 Don't forget this

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByToken(String token);
    List<Patient> findByDoctorId(String doctorId);
    boolean existsByTokenAndDate(String token, LocalDate date);
}
