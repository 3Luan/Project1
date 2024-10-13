package com.project1.model;

import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Document(collection = "posts")
@Getter
@Setter
public class Post {

    @Id
    private String id;

    @DBRef
    private User user; // Tham chiếu đến đối tượng User

    private List<String> tags;
    private String title;
    private String content;

    private List<Image> images;
    private List<File> files;

    @DBRef
    private List<User> likes;

    @DBRef
    private List<Comment> comments;

    private boolean isDoc;
    private boolean isDisplay;
    private boolean isDelete;

    private Date createdAt;
    private Date updatedAt;

    // Constructor
    public Post() {
        this.id = UUID.randomUUID().toString();
        this.isDoc = false;
        this.isDisplay = false;
        this.isDelete = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
