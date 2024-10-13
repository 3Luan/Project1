package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Document(collection = "comments")
@Getter
@Setter
public class Comment {

    @Id
    private String id;

    @DBRef
    private User user; // Tham chiếu đến đối tượng User

    private String content;

    @DBRef
    private List<Comment> replies; // Tham chiếu đến các comment khác như là phản hồi

    private boolean isDelete;

    private Date createdAt;
    private Date updatedAt;

    // Constructor
    public Comment() {
        this.isDelete = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
