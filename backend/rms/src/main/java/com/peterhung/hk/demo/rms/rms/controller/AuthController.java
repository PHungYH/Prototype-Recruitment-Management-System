package com.peterhung.hk.demo.rms.rms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.dto.request.*;
import com.peterhung.hk.demo.rms.rms.dto.response.*;
import com.peterhung.hk.demo.rms.rms.exceptions.*;
import com.peterhung.hk.demo.rms.rms.model.Admin;
import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.*;
import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private final AuthService authService;
	private final AdminUserDetailsServiceImpl adminUserDetailsServiceImpl;
	private final ApplicantUserDetailsServiceImpl applicantUserDetailsServiceImpl;
	private final ApplicantService applicantService;
	private final JwtUtils jwtUtils;

	public AuthController(AuthService authService, JwtUtils jwtUtils,
			AdminUserDetailsServiceImpl adminUserDetailsService, 
			ApplicantUserDetailsServiceImpl applicantUserDetailsService,
			ApplicantService applicantService) {
		this.authService = authService;
		this.adminUserDetailsServiceImpl = adminUserDetailsService;
		this.applicantUserDetailsServiceImpl = applicantUserDetailsService;
		this.applicantService = applicantService;
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
	// Success registrations -> login
	@PostMapping("/registerApplicant")
	public ResponseEntity<?> registerApplicant(@RequestBody ApplicantRegistrationRequest registrationRequest) {
		try {
			applicantService.validateAndCreateUser(registrationRequest);
		} catch (UserExistsException e) {
			logger.error("Failed to register applicant: " + registrationRequest.getUsername(), e);
			return ResponseEntity.ok(new SimpleErrorResponse(applicantService.getLastErrorCode(), applicantService.getLastErrorMessage()));
		} catch (InvalidUserDetailException e) {
			logger.error("Invalid user details for applicant registration: " + registrationRequest.getUsername(), e);
			return ResponseEntity.ok(new SimpleErrorResponse(applicantService.getLastErrorCode(), applicantService.getLastErrorMessage()));
		}
		
		ResponseEntity<?> response = login(new UserAuthRequest(UserType.APPLICANT, registrationRequest.getUsername(), registrationRequest.getPassword()));
		
		if (response.getStatusCode() == HttpStatus.OK) {
			AuthResponse authResponse = (AuthResponse) response.getBody();
			if (authResponse != null) {
				logger.info("Applicant registered successfully: " + registrationRequest.getUsername());
			} else {
				// Rollback user in database
				applicantService.removeUser(registrationRequest.getUsername());
				logger.error("Unexpected error: AuthResponse is null");
			}
		} else {
			applicantService.removeUser(registrationRequest.getUsername());
			logger.error("Failed to register applicant: " + registrationRequest.getUsername());
		}
		return response;
	}

	// Endpoint: /api/login
	// Process login requests.
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserAuthRequest authRequest) {
		if (authRequest.getUserType() == UserType.ADMIN
				&& authService.authenticateAdmin(authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			Admin admin = authService.getLastAuthAdmin();
			if (admin == null) {
				logger.info("Unexpected error when getting admin object");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			String token = jwtUtils.generateToken(admin.getUsername(), UserType.ADMIN);
			logger.info("Success login attempt, admin: " + admin.getUsername());
			return ResponseEntity.ok(new AuthResponse(token));
		} else if (authRequest.getUserType() == UserType.APPLICANT
				&& authService.authenticateApplicant(authRequest.getUsernameOrEmail(), authRequest.getPassword())) {
			Applicant applicant = authService.getLastAuthApplicant();
			if (applicant == null) {
				logger.info("Unexpected error when getting applicant object");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			String token = jwtUtils.generateToken(applicant.getUsername(), UserType.APPLICANT);
			logger.info("Success login attempt, applicant: " + applicant.getUsername());
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
			return ResponseEntity.ok(new SimpleBooleanResponse(true));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	// Endpoint: /api/getLoggedInUsername
	// Get the currently logged-in username.
	@GetMapping("/getLoggedInUsernameType")
	public ResponseEntity<?> getLoggedInUsernameType(@RequestHeader String token) {
		String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
		if (usernameType == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		UserDetails userDetails;
		if (usernameType[1].equals(UserType.ADMIN.toString())) {
			userDetails = adminUserDetailsServiceImpl.loadUserByUsername(usernameType[0]);
			Admin admin = adminUserDetailsServiceImpl.getAdmin();
			if (admin == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} else if (usernameType[1].equals(UserType.APPLICANT.toString())) {
			userDetails = applicantUserDetailsServiceImpl.loadUserByUsername(usernameType[0]);
			Applicant applicant = applicantUserDetailsServiceImpl.getApplicant();
			if (applicant == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user type");
		}

		return ResponseEntity.ok(new CurrentUsernameTypeResponse(userDetails.getUsername(), usernameType[1]));
	}

}