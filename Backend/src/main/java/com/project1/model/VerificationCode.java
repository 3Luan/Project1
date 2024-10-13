package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Document(collection = "verification_codes")
@Getter
@Setter
public class VerificationCode {

    @Id
    private String id;

    private String email; // Địa chỉ email
    private String code; // Mã xác minh

    private Date createdAt; // Thời điểm mã được tạo

    // Constructor
    public VerificationCode() {
        this.createdAt = new Date();
    }
}
