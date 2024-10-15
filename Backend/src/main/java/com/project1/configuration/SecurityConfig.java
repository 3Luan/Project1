package com.project1.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        // Cho phép các URL công khai
                        .requestMatchers("/", "/api/auth/**", "/public/**").permitAll()
                        // Các yêu cầu còn lại phải xác thực
                        .anyRequest().authenticated())
                // Cấu hình đăng nhập OAuth2
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(successHandler()))
                // Vô hiệu hóa CSRF nếu không cần thiết (dành cho các API)
                .csrf().disable()
                .build();
    }

    @Bean
    public SimpleUrlAuthenticationSuccessHandler successHandler() {
        return new SimpleUrlAuthenticationSuccessHandler("/api/auth/loginGoogle"); // URL chuyển hướng sau khi thành
                                                                                   // công
    }
}