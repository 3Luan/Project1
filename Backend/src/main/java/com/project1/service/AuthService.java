package com.project1.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
import com.project1.dto.request.VerifyCodeAndRegisterRequestDTO;
import com.project1.dto.response.LoginResponeDTO;
import com.project1.dto.response.ResponseData;
import com.project1.model.User;
import com.project1.model.VerificationCode;
import com.project1.repository.UserRepository;
import com.project1.repository.VerificationCodeRepository;
import com.project1.util.EmailService;

import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

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

                LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user.getId(), user.getName(), user.getEmail(),
                        user.getGender(), user.getPic(), user.isAdmin(), user.isBan(), user.getBirth());

                return Optional.of(loginResponeDTO);
            }
        }

        return Optional.empty(); // Trả về empty nếu không tìm thấy hoặc password sai
    }

    // Register
    public ResponseData<LoginResponeDTO> register(RegisterRequestDTO registerRequestDTO,
            HttpServletResponse response) {
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        Optional<User> optionalUser = userRepository.findByEmail(registerRequestDTO.getEmail());

        if (optionalUser.isPresent()) {
            // Người dùng đã tồn tại
            return new ResponseData<LoginResponeDTO>(HttpStatus.CONFLICT.value(), "Email đã tồn tại!", null);
        }

        // Xóa mã xác thực cũ nếu có
        verificationCodeRepository.deleteByEmail(registerRequestDTO.getEmail());

        // Tạo mã xác thực
        String verificationCode = generateVerificationCode();
        VerificationCode verificatioCode = new VerificationCode(registerRequestDTO.getEmail(), verificationCode);
        verificationCodeRepository.save(verificatioCode); // Lưu mã xác thực vào cơ sở dữ liệu

        // Gửi mã xác thực qua email
        new EmailService().sendVerificationEmail(registerRequestDTO.getEmail(), verificationCode);

        return new ResponseData<LoginResponeDTO>(HttpStatus.OK.value(), "Vui lòng kiểm tra email để nhận mã xác thực!",
                null);

    }

    // Hàm tạo mã xác thực ngẫu nhiên (Code)
    private String generateVerificationCode() {
        return RandomStringUtils.randomAlphanumeric(6).toUpperCase(); // Tạo mã 6 ký tự ngẫu nhiên
    }

    // VerifyCode
    public ResponseData<LoginResponeDTO> verifyCode(VerifyCodeAndRegisterRequestDTO verifyCodeAndRegisterRequestDTO,
            HttpServletResponse response) {
        // Kiểm tra thông tin đầu vào
        if (verifyCodeAndRegisterRequestDTO.getCode() == "" || verifyCodeAndRegisterRequestDTO.getEmail() == "" ||
                verifyCodeAndRegisterRequestDTO.getName() == "" || verifyCodeAndRegisterRequestDTO.getPassword() == ""
                || verifyCodeAndRegisterRequestDTO.getGender() == "") {
            return new ResponseData<LoginResponeDTO>(HttpStatus.BAD_REQUEST.value(), "Thông tin không đủ!",
                    null);
        }

        // Kiểm tra xem người dùng đã tồn tại chưa
        Optional<User> optionalUser = userRepository.findByEmail(verifyCodeAndRegisterRequestDTO.getEmail());
        if (optionalUser.isPresent()) {
            // Người dùng đã tồn tại
            return new ResponseData<LoginResponeDTO>(HttpStatus.CONFLICT.value(), "Email đã tồn tại!", null);
        }

        // Tìm mã xác thực trong cơ sở dữ liệu
        VerificationCode verificationCode = verificationCodeRepository
                .findByEmailAndCode(verifyCodeAndRegisterRequestDTO.getEmail(),
                        verifyCodeAndRegisterRequestDTO.getCode());

        if (verificationCode == null) {
            return new ResponseData<LoginResponeDTO>(HttpStatus.UNAUTHORIZED.value(), "Mã xác thực không hợp lệ!",
                    null);
        }

        // Kiểm tra xem mã xác thực có hết hạn không
        long expirationTime = 15 * 60 * 1000; // Thời gian hết hạn (15 phút)
        long codeTime = verificationCode.getCreatedAt().getTime();
        if (System.currentTimeMillis() - codeTime > expirationTime) {
            return new ResponseData<LoginResponeDTO>(HttpStatus.BAD_REQUEST.value(), "Mã xác thực đã hết hạn!", null);
        }

        // Mã hóa mật khẩu
        String hashedPassword = new BCryptPasswordEncoder().encode(verifyCodeAndRegisterRequestDTO.getPassword());

        // Tạo người dùng mới
        User newUser = new User(verifyCodeAndRegisterRequestDTO.getName(), verifyCodeAndRegisterRequestDTO.getEmail(),
                hashedPassword,
                verifyCodeAndRegisterRequestDTO.getGender());
        userRepository.save(newUser);

        // Tạo token cho người dùng mới
        var token = generateToken(newUser.getId());

        // Lưu token vào cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true); // Bảo vệ cookie khỏi JavaScript
        cookie.setSecure(true); // Chỉ gửi qua HTTPS
        cookie.setPath("/"); // Cookie sẽ có hiệu lực cho toàn bộ ứng dụng
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 ngày tính bằng giây
        response.addCookie(cookie); // Thêm cookie vào phản hồi

        // Xóa mã xác thực sau khi đã sử dụng
        verificationCodeRepository.delete(verificationCode);

        LoginResponeDTO loginResponeDTO = new LoginResponeDTO(newUser.getId(), newUser.getName(), newUser.getEmail(),
                newUser.getGender(), newUser.getPic(), newUser.isAdmin(), newUser.isBan(), newUser.getBirth());

        return new ResponseData<LoginResponeDTO>(HttpStatus.OK.value(), "Đăng ký thành công!", loginResponeDTO);
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
                    LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user.getId(), user.getName(), user.getEmail(),
                            user.getGender(), user.getPic(), user.isAdmin(), user.isBan(), user.getBirth());
                    return Optional.of(loginResponeDTO);
                }
            }

        }

        return Optional.empty(); // Trả về empty nếu không tìm thấy hoặc password sai
    }

    // Logout
    public ResponseData<LoginResponeDTO> logout(HttpServletRequest request, HttpServletResponse response) {
        // Tìm cookie có tên là "token"
        Cookie[] cookies = request.getCookies();
        boolean cookieFound = false;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    // Nếu tìm thấy cookie, xóa cookie
                    cookie.setValue(null); // Xóa giá trị của cookie
                    cookie.setPath("/"); // Đặt đường dẫn cookie
                    cookie.setMaxAge(0); // Đặt thời gian sống của cookie thành 0 để xóa
                    response.addCookie(cookie); // Thêm cookie đã xóa vào phản hồi
                    cookieFound = true;
                    break; // Dừng vòng lặp nếu đã tìm thấy và xóa cookie
                }
            }
        }

        if (cookieFound) {
            return new ResponseData<LoginResponeDTO>(HttpStatus.OK.value(), "Đăng xuất thành công!");
        } else {
            return new ResponseData<LoginResponeDTO>(HttpStatus.BAD_REQUEST.value(),
                    "Không có phiên đăng nhập nào để đăng xuất.");
        }
    }

    // Login
    public ResponseData<LoginResponeDTO> loginGoogle(HttpServletResponse response, OAuth2User principal) {

        if (principal == null) {
            return new ResponseData<LoginResponeDTO>(HttpStatus.BAD_REQUEST.value(),
                    "Đăng nhập thất bại.");
        }

        Optional<User> optionalUser = userRepository.findByEmail(principal.getAttribute("email"));

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Tạo token cho người dùng
            var token = generateToken(user.getId());

            // Lưu token vào cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true); // Bảo vệ cookie khỏi JavaScript
            cookie.setSecure(true); // Chỉ gửi qua HTTPS
            cookie.setPath("/"); // Cookie sẽ có hiệu lực cho toàn bộ ứng dụng
            cookie.setMaxAge(30 * 24 * 60 * 60); // 30 ngày tính bằng giây
            response.addCookie(cookie); // Thêm cookie vào phản hồi

            LoginResponeDTO loginResponeDTO = new LoginResponeDTO(user.getId(), user.getName(), user.getEmail(),
                    user.getGender(), user.getPic(), user.isAdmin(), user.isBan(), user.getBirth());

            return new ResponseData<LoginResponeDTO>(HttpStatus.OK.value(), "Đăng nhập thành công!", loginResponeDTO);
        }

        // Tạo người dùng mới
        User newUser = new User(principal.getAttribute("name"), principal.getAttribute("email"),
                principal.getAttribute("picture"));
        userRepository.save(newUser);

        // Tạo token cho người dùng mới
        var token = generateToken(newUser.getId());

        // Lưu token vào cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true); // Bảo vệ cookie khỏi JavaScript
        cookie.setSecure(true); // Chỉ gửi qua HTTPS
        cookie.setPath("/"); // Cookie sẽ có hiệu lực cho toàn bộ ứng dụng
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 ngày tính bằng giây
        response.addCookie(cookie); // Thêm cookie vào phản hồi

        LoginResponeDTO loginResponeDTO = new LoginResponeDTO(newUser.getId(), newUser.getName(), newUser.getEmail(),
                newUser.getGender(), newUser.getPic(), newUser.isAdmin(), newUser.isBan(), newUser.getBirth());

        return new ResponseData<LoginResponeDTO>(HttpStatus.OK.value(), "Đăng nhập thành công!", loginResponeDTO);
    }

}
