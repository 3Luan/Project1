package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Document(collection = "chats")
@Getter
@Setter
public class Chat {

    @Id
    private String id;

    private String chatName;

    private boolean isGroupChat;

    @DBRef
    private List<User> users; // Danh sách người tham gia trong chat

    @DBRef
    private Message latestMessage; // Tin nhắn mới nhất

    @DBRef
    private User groupAdmin; // Người quản trị nhóm (nếu là group chat)

    private Date createdAt;
    private Date updatedAt;

    // Constructor
    public Chat() {
        this.isGroupChat = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
