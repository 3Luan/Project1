package com.project1.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "users")
@Getter
@Setter
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String gender;
    private Date birth;
    private String pic;
    private boolean isAdmin;
    private boolean isBan;
    private boolean verified;

    @DBRef
    private List<User> followings;

    @DBRef
    private List<User> followers;

    @DBRef
    private List<Post> postsSaved;

    @CreatedDate // Thêm annotation này
    private Date createdAt;

    @LastModifiedDate // Thêm annotation này
    private Date updatedAt;

    // Constructor
    public User(String name, String email, String password, String gender, Date birth, String pic) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birth = new Date(2003, 10, 29); // Default value: 29/11/2003
        this.pic = pic;
        this.isAdmin = false;
        this.isBan = false;
        this.verified = false;
        this.followings = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.postsSaved = new ArrayList<>();
    }
}
