package com.peterhung.hk.demo.hrms.hrms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.peterhung.hk.demo.hrms.hrms.dto.*;
import com.peterhung.hk.demo.hrms.hrms.securityUtils.SecretGenerator;
import com.peterhung.hk.demo.hrms.hrms.service.AuthService;

import java.util.Date;

@RestController
@RequestMapping("/api")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private static final SecretGenerator secretGenerator = new SecretGenerator();
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// Endpoint: /api/login
	// Process login requests. Session valid for 1 day.
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
		if (authenticate(authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			String token = generateToken(authRequest.getUsernameOrEmail());
			logger.info("Success login attempt, user: " + authRequest.getUsernameOrEmail());
			return ResponseEntity.ok(new AuthResponse(token));
		} else {
			logger.info("Failed login attempt, user: " + authRequest.getUsernameOrEmail());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	private boolean authenticate(String usernameOrEmail, String password) {
		return authService.authenticate(usernameOrEmail, password);
	}

	private String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(SignatureAlgorithm.HS256, secretGenerator.getSecretBytes())
				.compact();
	}

}