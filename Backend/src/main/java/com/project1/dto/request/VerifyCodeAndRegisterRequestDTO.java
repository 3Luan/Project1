package com.project1.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class VerifyCodeAndRegisterRequestDTO implements Serializable {
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được bỏ trống")
    private String email;

    @NotBlank(message = "Password không được bỏ trống")
    private String password;

    @NotBlank(message = "Họ và tên không được bỏ trống")
    private String name;

    @NotBlank(message = "Giới tính không được bỏ trống")
    private String gender;

    @NotBlank(message = "Code không được bỏ trống")
    private String code;
}
