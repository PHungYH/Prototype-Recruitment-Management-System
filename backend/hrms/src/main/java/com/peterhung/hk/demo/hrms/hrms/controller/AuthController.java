package com.peterhung.hk.demo.hrms.hrms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.hrms.hrms.dto.*;
import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.hrms.hrms.service.AuthService;
import com.peterhung.hk.demo.hrms.hrms.service.EmployeeUserDetailsService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private final AuthService authService;
	private final EmployeeUserDetailsService employeeUserDetailsService;
	private final JwtUtils jwtUtils;
	
	public AuthController(AuthService authService, JwtUtils jwtUtils, EmployeeUserDetailsService employeeUserDetailsService) {
		this.authService = authService;
		this.employeeUserDetailsService = employeeUserDetailsService;
		this.jwtUtils = jwtUtils;
	}

	// Endpoint: /api/login
	// Process login requests.
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
		if (authService.authenticate(authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			String token = jwtUtils.generateToken(authRequest.getUsernameOrEmail());
			logger.info("Success login attempt, user: " + authRequest.getUsernameOrEmail());
			return ResponseEntity.ok(new AuthResponse(token));
		} else {
			logger.info("Failed login attempt, user: " + authRequest.getUsernameOrEmail());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// Endpoint: /api/getLoggedInUser
	// Get the currently logged-in user.
	@GetMapping("/getLoggedInUser")
	public UserResponse getLoggedInUser(@RequestHeader String token) {
		employeeUserDetailsService.loadUserByUsername(jwtUtils.getUsernameFromToken(token));
		Employee employee = employeeUserDetailsService.getEmployee();
		if (employee == null) {
			return new UserResponse("");
		}
		return new UserResponse(employee.getProfile().getLastname() + " " + employee.getProfile().getFirstname());
	}
	
}