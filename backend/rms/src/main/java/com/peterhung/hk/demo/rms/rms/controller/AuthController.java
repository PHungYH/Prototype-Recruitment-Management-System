package com.peterhung.hk.demo.rms.rms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.dto.*;
import com.peterhung.hk.demo.rms.rms.model.Admin;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.AdminAuthService;
import com.peterhung.hk.demo.rms.rms.service.AdminUserDetailsServiceImpl;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private final AdminAuthService authService;
	private final AdminUserDetailsServiceImpl userDetailsServiceImpl;
	// TODO: applicant UDS
	private final JwtUtils jwtUtils;
	
	public AuthController(AdminAuthService authService, JwtUtils jwtUtils, AdminUserDetailsServiceImpl employeeUserDetailsService) {
		this.authService = authService;
		this.userDetailsServiceImpl = employeeUserDetailsService;
		this.jwtUtils = jwtUtils;
	}

	// Endpoint: /migrateApplicant
	// Migrate applicant data to employee. 
	// Move applicant account to employee.
	@PostMapping("/migrateApplicant")
	public ResponseEntity<?> migrateApplicant(@RequestBody ApplicantAuthRequest authRequest) {
		return ResponseEntity.ok("");
	}
	
	// Endpoint: /registerApplicant
	// Register job applicants
	// Username must not contain special character
	@PostMapping("/registerApplicant")
	public ResponseEntity<?> registerApplicant(@RequestBody ApplicantAuthRequest authRequest) {
		return ResponseEntity.ok("");
	}

	// Endpoint: /api/login
	// Process login requests.
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AdminAuthRequest authRequest) {
		// TODO: by user type
		if (authService.authenticate(authRequest.getUsername(), authRequest.getPassword())) {
			Admin employee = authService.getLastAuthAdmin();
			if (employee == null) {
				logger.info("Unexpected error when getting admin object");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			String token = jwtUtils.generateToken(employee.getUsername());
			logger.info("Success login attempt, admin: " + (employee != null? employee.getUsername(): ""));
			return ResponseEntity.ok(new AuthResponse(token));
		} else {
			logger.info("Failed login attempt, admin: " + authRequest.getUsername());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// Endpoint: /api/validateToken
	// Validate token validity
	@GetMapping("/validateToken")
	public ResponseEntity<?> validateToken(@RequestHeader String token) {
		if (jwtUtils.validateJwtToken(token)) {
			return ResponseEntity.ok(new SimpleBooleanReply(true));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// Endpoint: /api/getLoggedInUser
	// Get the currently logged-in user.
	@GetMapping("/getLoggedInUser")
	public ResponseEntity<?> getLoggedInUser(@RequestHeader String token) {
		// TODO: by user type
		UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtUtils.getUsernameFromToken(token));
		
		Admin admin = userDetailsServiceImpl.getAdmin();
		if (admin == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(new CurrentAdminUserResponse(userDetails.getUsername()));
	}
	
}