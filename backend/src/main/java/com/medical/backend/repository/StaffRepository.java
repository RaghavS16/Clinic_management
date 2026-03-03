package com.medical.backend.repository;

import com.medical.backend.models.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmail(String email);
    Optional<Staff> findByDoctorId(String doctorId); // or use findByEmail if email is your doctor ID
    List<Staff> findByRole(String role);
}
