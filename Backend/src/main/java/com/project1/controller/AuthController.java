package com.project1.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project1.dto.request.LoginRequestDTO;
import com.project1.dto.request.RegisterRequestDTO;
import com.project1.dto.response.LoginResponeDTO;
import com.project1.dto.response.ResponseData;
import com.project1.service.AuthService;

import java.util.*;;

@RestController
@RequestMapping("/api/auth")
@Validated
@Slf4j
@Tag(name = "Auth Controller")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Login")
    @PostMapping(value = "/login")
    public ResponseEntity<ResponseData<LoginResponeDTO>> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO,
            HttpServletResponse response) {

        Optional<LoginResponeDTO> optionalLoginResponeDTO = authService.login(loginRequestDTO.getEmail(),
                loginRequestDTO.getPassword(), response);

        if (optionalLoginResponeDTO.isPresent()) {
            LoginResponeDTO loginResponeDTO = optionalLoginResponeDTO.get();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseData<>(HttpStatus.OK.value(), "Đăng nhập thành công!", loginResponeDTO));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không đúng!"));
        }
    }

    @Operation(summary = "Register")
    @PostMapping(value = "/register")
    public ResponseEntity<ResponseData<LoginResponeDTO>> register(
            @Valid @RequestBody RegisterRequestDTO registerRequestDTO,
            HttpServletResponse response) {

        Optional<LoginResponeDTO> optionalLoginResponeDTO = authService.register(registerRequestDTO, response);

        if (optionalLoginResponeDTO.isPresent()) {
            LoginResponeDTO loginResponeDTO = optionalLoginResponeDTO.get();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseData<>(HttpStatus.OK.value(), "Đăng ký thành công!", loginResponeDTO));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Email đã tồn tại!"));
        }
    }

    @Operation(summary = "Refresh")
    @PostMapping(value = "/refresh")
    public ResponseEntity<ResponseData<LoginResponeDTO>> refresh(HttpServletRequest request) {
        String token = null;

        // Lấy cookie từ request
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue(); // Lưu giá trị token từ cookie
                    break; // Thoát khỏi vòng lặp khi tìm thấy cookie
                }
            }
        }

        // Kiểm tra xem token có null không
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Đăng nhập hết hạn!"));
        }

        Optional<LoginResponeDTO> optionalLoginResponeDTO = authService.refresh(token);

        if (optionalLoginResponeDTO.isPresent()) {
            LoginResponeDTO loginResponeDTO = optionalLoginResponeDTO.get();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseData<>(HttpStatus.OK.value(), "Refresh thành công!", loginResponeDTO));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Đăng nhập hết hạn!"));
        }
    }

    // @Operation(summary = "Register")
    // @PostMapping(value = "/register")
    // public ResponseEntity<ResponseData<User>> register(@Valid @RequestBody
    // RegisterRequestDTO registerRequestDTO) {

    // Optional<User> optionalUser =
    // authService.login(registerRequestDTO.getEmail(),
    // registerRequestDTO.getPassword());

    // if (optionalUser.isPresent()) {
    // User user = optionalUser.get();

    // // return ResponseEntity.ok(new ResponseData<>(HttpStatus.OK.value(), "Đăng
    // nhập
    // // thành công", "JWT_TOKEN"));
    // return ResponseEntity.status(HttpStatus.OK)
    // .body(new ResponseData<>(HttpStatus.OK.value(), "Đăng nhập thành công!",
    // user));
    // } else {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    // .body(new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật
    // khẩu không đúng!"));
    // }

    // }
}
