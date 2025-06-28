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
import com.peterhung.hk.demo.rms.rms.service.AuthService;
import com.peterhung.hk.demo.rms.rms.service.UserDetailsServiceImpl;

// Data based on testdata.sql
@SpringBootTest
public class AuthControllerTests {

	private AuthController controller;
	@Autowired
	private AuthService authService;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserDetailsServiceImpl employeeUserDetailsService;

	@BeforeEach
	public void setUp() throws Exception {
		controller = new AuthController(authService, jwtUtils, employeeUserDetailsService);
	}

	@Test
	public void testValidLogin() {
		AuthRequest request = new AuthRequest("phung", "P@ssw0rd");
		assert(controller.login(request).getStatusCode()).equals(HttpStatus.OK);
	}

	@Test
	public void testInvalidLogin() {
		AuthRequest request1 = new AuthRequest("phung", "badpass");
		AuthRequest request2 = new AuthRequest("baduser", "P@ssw0rd");
		assert(controller.login(request1).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
		assert(controller.login(request2).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void testLoggedInUserByUsername() {
		AuthRequest request = new AuthRequest( "phung", "P@ssw0rd");
		ResponseEntity<?> response = controller.login(request);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseName = controller.getLoggedInUser(token);
		assert(responseName.getStatusCode()).equals(HttpStatus.OK);
		CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUserName()).equals("phung");
		assert(userResponse.getProfileLastName()).equals("Hung");
		assert(userResponse.getProfileFirstName()).equals("Peter");
	}

	@Test
	public void testLoggedInUserByUsernameCaseSensitive() {
		AuthRequest request = new AuthRequest("PHUNG", "P@ssw0rd");
		ResponseEntity<?> response = controller.login(request);
		assert(response.getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void testLoggedInUserByEmail() {
		AuthRequest request = new AuthRequest("jxue@company.com", "P@ssw0rd");
		ResponseEntity<?> response = controller.login(request);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseName = controller.getLoggedInUser(token);
		assert(responseName.getStatusCode()).equals(HttpStatus.OK);
		CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUserName()).equals("jxue");
		assert(userResponse.getProfileLastName()).equals("Xue");
		assert(userResponse.getProfileFirstName()).equals("Chun");
	}

	@Test
	public void testLoggedInUserByEmailCaseInsensitive() {
		AuthRequest request = new AuthRequest( "JXUE@company.com", "P@ssw0rd");
		ResponseEntity<?> response = controller.login(request);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseName = controller.getLoggedInUser(token);
		assert(responseName.getStatusCode()).equals(HttpStatus.OK);
		CurrentUserResponse userResponse = (CurrentUserResponse) responseName.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUserName()).equals("jxue");
		assert(userResponse.getProfileLastName()).equals("Xue");
		assert(userResponse.getProfileFirstName()).equals("Chun");
	}
}
