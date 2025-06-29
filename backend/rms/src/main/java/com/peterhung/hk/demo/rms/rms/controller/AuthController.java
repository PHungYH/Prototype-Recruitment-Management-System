package com.peterhung.hk.demo.rms.rms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.dto.*;
import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.AuthService;
import com.peterhung.hk.demo.rms.rms.service.UserDetailsServiceImpl;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private final AuthService authService;
	private final UserDetailsServiceImpl userDetailsServiceImpl;
	private final JwtUtils jwtUtils;
	
	public AuthController(AuthService authService, JwtUtils jwtUtils, UserDetailsServiceImpl employeeUserDetailsService) {
		this.authService = authService;
		this.userDetailsServiceImpl = employeeUserDetailsService;
		this.jwtUtils = jwtUtils;
	}

	// Endpoint: /transferApplicant
	// Transfer applicant data to employee. 
	// Move applicant account to employee.
	// Only available to HR role
	@PostMapping("/transferApplicant")
	public ResponseEntity<?> transferApplicant(@RequestBody AuthRequest authRequest) {
		return ResponseEntity.ok("");
	}
	
	// Endpoint: /registerApplicant
	// Register job applicants
	// Username must not contain special character
	@PostMapping("/registerApplicant")
	public ResponseEntity<?> registerApplicant(@RequestBody AuthRequest authRequest) {
		return ResponseEntity.ok("");
	}

	// Endpoint: /api/login
	// Process login requests.
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
		if (authService.authenticate(authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			Applicant employee = authService.getLastAuthEmployee();
			if (employee == null) {
				logger.info("Unexpected error when getting emlpoyee object");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			String token = jwtUtils.generateToken(employee.getUsername());
			logger.info("Success login attempt, user: " + (employee != null? employee.getUsername(): ""));
			return ResponseEntity.ok(new AuthResponse(token));
		} else {
			logger.info("Failed login attempt, user: " + authRequest.getUsernameOrEmail());
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
		
		UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtUtils.getUsernameFromToken(token));
		
		Applicant employee = userDetailsServiceImpl.getEmployee();
		if (employee == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(new CurrentUserResponse(userDetails.getUsername(), employee.getProfile().getLastname(), employee.getProfile().getFirstname()));
	}
	
}