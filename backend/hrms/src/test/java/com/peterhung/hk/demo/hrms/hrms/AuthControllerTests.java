package com.peterhung.hk.demo.hrms.hrms;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import com.peterhung.hk.demo.hrms.hrms.controller.AuthController;
import com.peterhung.hk.demo.hrms.hrms.dto.AuthRequest;
import com.peterhung.hk.demo.hrms.hrms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.hrms.hrms.service.AuthService;
import com.peterhung.hk.demo.hrms.hrms.service.EmployeeUserDetailsService;

@SpringBootTest
public class AuthControllerTests {

	private AuthController controller;
	@Autowired
	private AuthService authService;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private EmployeeUserDetailsService employeeUserDetailsService;

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
}
