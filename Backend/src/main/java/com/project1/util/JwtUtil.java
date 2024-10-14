// package com.project1.util;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.function.Function;

// @Component
// public class JwtUtil {

// // Tạo secret key (nên lưu secret key vào file config an toàn hơn)
// private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

// // Lấy thông tin username từ JWT
// public String extractUsername(String token) {
// return extractClaim(token, Claims::getSubject);
// }

// // Lấy toàn bộ Claims (dữ liệu) từ JWT
// public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
// final Claims claims = extractAllClaims(token);
// return claimsResolver.apply(claims);
// }

// // Giải mã token và lấy toàn bộ thông tin Claims
// private Claims extractAllClaims(String token) {
// return
// Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
// }

// // Kiểm tra xem token có hết hạn không
// private Boolean isTokenExpired(String token) {
// return extractExpiration(token).before(new Date());
// }

// // Lấy ngày hết hạn từ token
// public Date extractExpiration(String token) {
// return extractClaim(token, Claims::getExpiration);
// }

// // Tạo JWT từ username và các thông tin bổ sung (claims)
// public String generateToken(String username) {
// Map<String, Object> claims = new HashMap<>();
// return createToken(claims, username);
// }

// // Tạo JWT với các thông tin claims
// private String createToken(Map<String, Object> claims, String subject) {
// return Jwts.builder()
// .setClaims(claims)
// .setSubject(subject)
// .setIssuedAt(new Date(System.currentTimeMillis()))
// .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //
// Token hết hạn sau 10 giờ
// .signWith(key)
// .compact();
// }

// // Xác minh JWT
// public Boolean validateToken(String token, String username) {
// final String extractedUsername = extractUsername(token);
// return (extractedUsername.equals(username) && !isTokenExpired(token));
// }
// }
