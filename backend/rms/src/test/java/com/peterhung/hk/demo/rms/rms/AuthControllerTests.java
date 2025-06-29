package com.peterhung.hk.demo.rms.rms;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;

import com.peterhung.hk.demo.rms.rms.controller.AuthController;
import com.peterhung.hk.demo.rms.rms.dto.*;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.AdminAuthService;
import com.peterhung.hk.demo.rms.rms.service.AdminUserDetailsServiceImpl;

// Data based on testdata.sql
@SpringBootTest
public class AuthControllerTests {

	// private AuthController controller;
	// @Autowired
	// private AdminAuthService authService;
	// @Autowired
	// private JwtUtils jwtUtils;
	// @Autowired
	// private AdminUserDetailsServiceImpl employeeUserDetailsService;

	// @BeforeEach
	// public void setUp() throws Exception {
	// 	controller = new AuthController(authService, jwtUtils, employeeUserDetailsService);
	// }

	// @Test
	// public void testValidLogin() {
	// 	ApplicantAuthRequest request = new ApplicantAuthRequest("phung", "P@ssw0rd");
	// 	assert(controller.login(request).getStatusCode()).equals(HttpStatus.OK);
	// }

	// @Test
	// public void testInvalidLogin() {
	// 	ApplicantAuthRequest request1 = new ApplicantAuthRequest("phung", "badpass");
	// 	ApplicantAuthRequest request2 = new ApplicantAuthRequest("baduser", "P@ssw0rd");
	// 	assert(controller.login(request1).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	// 	assert(controller.login(request2).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	// }

	// @Test
	// public void testLoggedInUserByUsername() {
	// 	ApplicantAuthRequest request = new ApplicantAuthRequest( "phung", "P@ssw0rd");
	// 	ResponseEntity<?> response = controller.login(request);
	// 	assert(response.getStatusCode()).equals(HttpStatus.OK);
		
	// 	AuthResponse authResponse = (AuthResponse) response.getBody();
	// 	assertNotNull(authResponse);

	// 	String token = authResponse.getToken();
	// 	ResponseEntity<?> responseName = controller.getLoggedInUser(token);
	// 	assert(responseName.getStatusCode()).equals(HttpStatus.OK);
	// 	CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
	// 	assertNotNull(userResponse);
	// 	assert(userResponse.getUserName()).equals("phung");
	// 	assert(userResponse.getProfileLastName()).equals("Hung");
	// 	assert(userResponse.getProfileFirstName()).equals("Peter");
	// }

	// @Test
	// public void testLoggedInUserByUsernameCaseSensitive() {
	// 	ApplicantAuthRequest request = new ApplicantAuthRequest("PHUNG", "P@ssw0rd");
	// 	ResponseEntity<?> response = controller.login(request);
	// 	assert(response.getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	// }

	// @Test
	// public void testLoggedInUserByEmail() {
	// 	ApplicantAuthRequest request = new ApplicantAuthRequest("jxue@company.com", "P@ssw0rd");
	// 	ResponseEntity<?> response = controller.login(request);
	// 	assert(response.getStatusCode()).equals(HttpStatus.OK);
		
	// 	AuthResponse authResponse = (AuthResponse) response.getBody();
	// 	assertNotNull(authResponse);

	// 	String token = authResponse.getToken();
	// 	ResponseEntity<?> responseName = controller.getLoggedInUser(token);
	// 	assert(responseName.getStatusCode()).equals(HttpStatus.OK);
	// 	CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
	// 	assertNotNull(userResponse);
	// 	assert(userResponse.getUserName()).equals("jxue");
	// 	assert(userResponse.getProfileLastName()).equals("Xue");
	// 	assert(userResponse.getProfileFirstName()).equals("Chun");
	// }

	// @Test
	// public void testLoggedInUserByEmailCaseInsensitive() {
	// 	ApplicantAuthRequest request = new ApplicantAuthRequest( "JXUE@company.com", "P@ssw0rd");
	// 	ResponseEntity<?> response = controller.login(request);
	// 	assert(response.getStatusCode()).equals(HttpStatus.OK);
		
	// 	AuthResponse authResponse = (AuthResponse) response.getBody();
	// 	assertNotNull(authResponse);

	// 	String token = authResponse.getToken();
	// 	ResponseEntity<?> responseName = controller.getLoggedInUser(token);
	// 	assert(responseName.getStatusCode()).equals(HttpStatus.OK);
	// 	CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
	// 	assertNotNull(userResponse);
	// 	assert(userResponse.getUserName()).equals("jxue");
	// 	assert(userResponse.getProfileLastName()).equals("Xue");
	// 	assert(userResponse.getProfileFirstName()).equals("Chun");
	// }
}
