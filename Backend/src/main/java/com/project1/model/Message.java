package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Document(collection = "messages")
@Getter
@Setter
public class Message {

    @Id
    private String id;

    @DBRef
    private User sender; // Tham chiếu đến đối tượng User (người gửi)

    private String content;

    private List<Image> images; // Danh sách hình ảnh gửi kèm

    private List<File> files; // Danh sách tệp gửi kèm

    @DBRef
    private Chat chat; // Tham chiếu đến đối tượng Chat

    @DBRef
    private List<User> readBy; // Danh sách những người đã đọc tin nhắn

    private Date createdAt;
    private Date updatedAt;

    // Constructor
    public Message() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
