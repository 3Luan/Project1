package com.project1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

import com.project1.model.User;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponeDTO implements Serializable {
    private User user;
}
