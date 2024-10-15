package com.project1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponeDTO implements Serializable {

    private String id;

    private String name;

    private String email;

    private String gender;

    private String pic;

    private boolean isAdmin;

    private boolean isBan;

    private Date birth;
}
