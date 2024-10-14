package com.project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.project1.dto.request.RegisterRequestDTO;
import com.project1.dto.response.LoginResponeDTO;
import com.project1.model.User;
import com.project1.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    private String generateToken(String id) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(id)
                .issuer("project1.com")
                .issueTime(new Date())
                .expirationTime(Date.from(Instant.now().plus(30, ChronoUnit.DAYS)))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            return jwsObject.serialize(); // Trả về chuỗi token
        } catch (JOSEException e) {
            e.printStackTrace();
            return null; // hoặc bạn có thể trả về một chuỗi thông báo lỗi tùy chọn
        }
    }

    public Optional<String> validateToken(String token) {
        try {
            // Giải mã token
            JWSObject jwsObject = JWSObject.parse(token);

            // Kiểm tra chữ ký của token
            MACVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());
            if (!jwsObject.verify(verifier)) {
                return Optional.empty(); // Chữ ký không hợp lệ
            }

            // Lấy thông tin claims từ token
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

            // Kiểm tra thời gian hết hạn
            Date expirationTime = claimsSet.getExpirationTime();
            if (expirationTime != null && expirationTime.before(new Date())) {
                return Optional.empty(); // Token đã hết hạn
            }

            // Trả về userId từ trường "sub" nếu token hợp lệ
            return Optional.of(claimsSet.getSubject()); // Trả về userId

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty(); // Trả về empty nếu có lỗi trong quá trình kiểm tra
        }
    }

    // Login
    public Optional<LoginResponeDTO> login(String email, String password, HttpServletResponse response) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                var token = generateToken(user.getId());

                // Lưu token vào cookie
                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true); // Bảo vệ cookie khỏi JavaScript
                cookie.setSecure(true); // Chỉ gửi qua HTTPS
                cookie.setPath("/"); // Cookie sẽ có hiệu lực cho toàn bộ ứng dụng
                cookie.setMaxAge(30 * 24 * 60 * 60); // 30 ngày tính bằng giây
                response.addCookie(cookie); // Thêm cookie vào phản hồi

                LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user);
                return Optional.of(loginResponeDTO);
            }
        }

        return Optional.empty(); // Trả về empty nếu không tìm thấy hoặc password sai
    }

    // Register
    public Optional<LoginResponeDTO> register(RegisterRequestDTO registerRequestDTO, HttpServletResponse response) {
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        Optional<User> optionalUser = userRepository.findByEmail(registerRequestDTO.getEmail());

        if (optionalUser.isPresent()) {
            return Optional.empty(); // Người dùng đã tồn tại
        }

        // Tạo người dùng mới
        User user = new User(registerRequestDTO);
        user.setEmail(registerRequestDTO.getEmail());
        user.setPassword(registerRequestDTO.getPassword()); // Chú ý mã hóa mật khẩu trước khi lưu
        // Cài đặt các thuộc tính khác nếu cần
        userRepository.save(user); // Lưu người dùng vào cơ sở dữ liệu

        // Tạo token cho người dùng mới
        var token = generateToken(user.getId());

        // Lưu token vào cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true); // Bảo vệ cookie khỏi JavaScript
        cookie.setSecure(true); // Chỉ gửi qua HTTPS
        cookie.setPath("/"); // Cookie sẽ có hiệu lực cho toàn bộ ứng dụng
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 ngày tính bằng giây
        response.addCookie(cookie); // Thêm cookie vào phản hồi

        LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user);
        return Optional.of(loginResponeDTO);
    }

    // Refresh
    public Optional<LoginResponeDTO> refresh(String token) {

        if (token != null) {
            // User user = optionalUser.get();

            Optional<String> optionalUserId = validateToken(token);

            if (optionalUserId.isPresent()) {
                String userId = optionalUserId.get();

                // Tìm kiếm người dùng trong cơ sở dữ liệu
                Optional<User> optionalUser = userRepository.findById(userId);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    // Thực hiện logic làm mới (refresh)
                    LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user);
                    return Optional.of(loginResponeDTO);
                }
            }

        }

        return Optional.empty(); // Trả về empty nếu không tìm thấy hoặc password sai
    }
}
