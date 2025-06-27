package com.peterhung.hk.demo.hrms.hrms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.hrms.hrms.dto.*;
import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.hrms.hrms.service.AuthService;
import com.peterhung.hk.demo.hrms.hrms.service.UserDetailsServiceImpl;
import com.peterhung.hk.demo.hrms.hrms.service.Enum.UserType;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
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
		if (authService.authenticate(authRequest.getUserType(), authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			Employee employee = null;
			if (authRequest.getUserType().equals(UserType.EMPLOYEE))
				employee = authService.getLastAuthEmployee();
			// TODO: applicant impl
			
			String token = jwtUtils.generateToken(employee != null? employee.getUsername() : "");
			logger.info("Success login attempt, user: " + (employee != null? employee.getUsername(): ""));
			return ResponseEntity.ok(new AuthResponse(token));
		} else {
			logger.info("Failed login attempt, user: " + authRequest.getUsernameOrEmail());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// Endpoint: /api/validateToken
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
	public ResponseEntity<?> getLoggedInUser(@RequestHeader String token, @RequestParam UserType userType) {
		userDetailsServiceImpl.setUserType(userType);
		
		UserDetails userDetails;
		if (userType.equals(UserType.EMPLOYEE))
			userDetails = userDetailsServiceImpl.loadUserByUsername(jwtUtils.getUsernameFromToken(token));
		else
			userDetails = userDetailsServiceImpl.loadUserByUsername(jwtUtils.getUsernameFromToken(token));
		Employee employee = userDetailsServiceImpl.getEmployee();
		if (employee == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok(new CurrentUserResponse(userType, userDetails.getUsername(), employee.getProfile().getLastname(), employee.getProfile().getFirstname()));
	}
	
}