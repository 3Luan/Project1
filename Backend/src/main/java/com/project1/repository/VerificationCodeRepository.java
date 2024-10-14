package com.project1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project1.model.VerificationCode;

public interface VerificationCodeRepository extends MongoRepository<VerificationCode, String> {
    // Tìm mã xác thực bằng email và mã code
    VerificationCode findByEmailAndCode(String email, String code);

    void deleteByEmail(String email);
}
