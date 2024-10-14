package com.project1.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Document(collection = "verification_codes")
@Getter
@Setter
// @AllArgsConstructor
public class VerificationCode {

    @Id
    private String id;

    private String email; // Địa chỉ email
    private String code; // Mã xác minh

    @CreatedDate // Tự động gán thời gian tạo
    private Date createdAt;

    // Constructor
    public VerificationCode(String email, String code) {
        this.email = email;
        this.code = code;
        this.createdAt = new Date();
    }
}
