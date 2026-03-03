package com.medical.backend.repository;

import com.medical.backend.models.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpCodeRepository extends JpaRepository<OtpCode, Long> {
    Optional<OtpCode> findByEmailAndCode(String email, String code);
}
