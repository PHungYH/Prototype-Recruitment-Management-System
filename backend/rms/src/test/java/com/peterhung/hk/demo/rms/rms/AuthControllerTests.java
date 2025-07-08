package com.peterhung.hk.demo.rms.rms;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;

import com.peterhung.hk.demo.rms.rms.controller.AuthController;
import com.peterhung.hk.demo.rms.rms.dto.request.*;
import com.peterhung.hk.demo.rms.rms.dto.response.*;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.*;
import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;

// Data based on testdata.sql
@SpringBootTest
public class AuthControllerTests {

	private AuthController controller;
	@Autowired
	private AuthService authService;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private AdminUserDetailsServiceImpl adminUserDetailsService;
	@Autowired
	private ApplicantUserDetailsServiceImpl applicantUserDetailsService;
	@Autowired
	private ApplicantService applicantService;

	@BeforeEach
	public void setUp() throws Exception {
		controller = new AuthController(authService, jwtUtils, adminUserDetailsService, applicantUserDetailsService, applicantService);
	}

	@Test
	public void testValidLoginAdmin() {
		UserAuthRequest request = new UserAuthRequest(UserType.ADMIN, "admin1", "P@ssw0rd");
		assert(controller.login(request).getStatusCode()).equals(HttpStatus.OK);
	}

	@Test
	public void testInvalidLoginAdmin() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.ADMIN, "phung", "badpass");
		UserAuthRequest request2 = new UserAuthRequest(UserType.ADMIN, "baduser", "P@ssw0rd");
		UserAuthRequest request3 = new UserAuthRequest(UserType.ADMIN, "pHung", "P@ssw0rd");
		assert(controller.login(request1).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
		assert(controller.login(request2).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
		assert(controller.login(request3).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void testValidLoginApplicant() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.APPLICANT, "johnsmith90", "P@ssw0rd");
		UserAuthRequest request2 = new UserAuthRequest(UserType.APPLICANT, "liam.ngUyen@example.com", "P@ssw0rd");
		assert(controller.login(request1).getStatusCode()).equals(HttpStatus.OK);		
		assert(controller.login(request2).getStatusCode()).equals(HttpStatus.OK);
	}

	@Test
	public void testInvalidLoginApplicant() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.APPLICANT, "emilytaylor93", "badpass");
		UserAuthRequest request2 = new UserAuthRequest(UserType.APPLICANT, "baduser", "P@ssw0rd");
		UserAuthRequest request3 = new UserAuthRequest(UserType.APPLICANT, "emilytAylor93", "P@ssw0rd");
		assert(controller.login(request1).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
		assert(controller.login(request2).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
		assert(controller.login(request3).getStatusCode()).equals(HttpStatus.UNAUTHORIZED);
	}

	@Test
	public void testAdminLoggedInUserByUsername() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.ADMIN, "admin1", "P@ssw0rd");

		ResponseEntity<?> response = controller.login(request1);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseName = controller.getLoggedInUsernameType(token);
		assert(responseName.getStatusCode()).equals(HttpStatus.OK);
		CurrentUsernameTypeResponse userResponse = (CurrentUsernameTypeResponse) responseName.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUsername()).equals("admin1");
	}

	@Test
	public void testApplicantLoggedInUserByUsername() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.APPLICANT, "emilytaylor93", "P@ssw0rd");

		ResponseEntity<?> response = controller.login(request1);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseNameType = controller.getLoggedInUsernameType(token);
		assert(responseNameType.getStatusCode()).equals(HttpStatus.OK);
		CurrentUsernameTypeResponse userResponse = (CurrentUsernameTypeResponse) responseNameType.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUsername()).equals("emilytaylor93");
	}

	@Test
	public void testApplicantLoggedInUserByEmail() {
		UserAuthRequest request1 = new UserAuthRequest(UserType.APPLICANT, "liam.ngUyen@example.com", "P@ssw0rd");

		ResponseEntity<?> response = controller.login(request1);
		assert(response.getStatusCode()).equals(HttpStatus.OK);
		
		AuthResponse authResponse = (AuthResponse) response.getBody();
		assertNotNull(authResponse);

		String token = authResponse.getToken();
		ResponseEntity<?> responseNameType = controller.getLoggedInUsernameType(token);
		assert(responseNameType.getStatusCode()).equals(HttpStatus.OK);
		CurrentUsernameTypeResponse userResponse = (CurrentUsernameTypeResponse) responseNameType.getBody();
		assertNotNull(userResponse);
		assert(userResponse.getUsername()).equals("liamnguyen91");
	}

	@Test
	public void testRegisterApplicant() {
		ApplicantRegistrationRequest request = new ApplicantRegistrationRequest();
		request.setUsername("hero");
		request.setEmail("hero@gmail.com");
		request.setPassword("LongP@ssw0rd");
		assert(controller.registerApplicant(request).getStatusCode()).equals(HttpStatus.OK);
	}
}
