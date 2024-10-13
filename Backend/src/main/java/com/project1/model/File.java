package com.project1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Document(collection = "files")
@Getter
@Setter
public class File {

    @Id
    private String id;
    private String name;
    private String path;

    // Constructor
    public File() {
        this.id = UUID.randomUUID().toString();
    }
}
