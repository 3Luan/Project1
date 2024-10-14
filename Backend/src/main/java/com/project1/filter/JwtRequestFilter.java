// package com.project1.filter;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;
// import io.jsonwebtoken.ExpiredJwtException;

// import javax.servlet.FilterChain;
// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.IOException;

// @Component
// public class JwtRequestFilter extends OncePerRequestFilter {

// @Autowired
// private JwtUtil jwtUtil;

// @Autowired
// private UserDetailsService userDetailsService;

// @Override
// protected void doFilterInternal(HttpServletRequest request,
// HttpServletResponse response, FilterChain chain)
// throws ServletException, IOException {

// final String authorizationHeader = request.getHeader("Authorization");

// String username = null;
// String jwt = null;

// // Kiểm tra JWT trong header Authorization
// if (authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
// {
// jwt = authorizationHeader.substring(7);
// try {
// username = jwtUtil.extractUsername(jwt);
// } catch (ExpiredJwtException e) {
// System.out.println("JWT expired");
// }
// }

// // Nếu JWT hợp lệ, thực hiện xác thực
// if (username != null &&
// SecurityContextHolder.getContext().getAuthentication() == null) {

// UserDetails userDetails =
// this.userDetailsService.loadUserByUsername(username);

// if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
// UsernamePasswordAuthenticationToken authenticationToken = new
// UsernamePasswordAuthenticationToken(
// userDetails, null, userDetails.getAuthorities());
// authenticationToken.setDetails(new
// WebAuthenticationDetailsSource().buildDetails(request));
// SecurityContextHolder.getContext().setAuthentication(authenticationToken);
// }
// }
// chain.doFilter(request, response);
// }
// }
