package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Document(collection = "notifications")
@Getter
@Setter
public class Notification {

    @Id
    private String id;

    @DBRef
    private User sender; // Người gửi thông báo

    @DBRef
    private User receiver; // Người nhận thông báo

    private String message; // Nội dung thông báo

    private boolean isRead; // Trạng thái đọc của thông báo

    private String link; // Đường dẫn đến nội dung thông báo

    private Date createdAt;
    private Date updatedAt;

    // Constructor
    public Notification() {
        this.isRead = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
