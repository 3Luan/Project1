package com.project1.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequestDTO implements Serializable {
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được bỏ trống")
    private String email;

    @NotBlank(message = "Password không được bỏ trống")
    private String password;

    @NotBlank(message = "Họ và tên không được bỏ trống")
    private String name;

    @NotBlank(message = "Giới tính không được bỏ trống")
    private String gender;

    @NotBlank(message = "Ngày sinh không được bỏ trống")
    private Date birth;
}
