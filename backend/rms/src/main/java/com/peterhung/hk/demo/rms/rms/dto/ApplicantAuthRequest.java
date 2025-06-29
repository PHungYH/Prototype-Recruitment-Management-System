package com.peterhung.hk.demo.rms.rms.dto;

// DTO = data transfer object
// Request json object for authentication
// Example: {"usernameOrEmail": "user", "password": "pass"}
public class ApplicantAuthRequest {
	private String usernameOrEmail;
	private String password;

	public ApplicantAuthRequest() {
	}

	public ApplicantAuthRequest(String usernameOrEmail, String password) {
		this.usernameOrEmail = usernameOrEmail;
		this.password = password;
	}

	public String getUsernameOrEmail() {
		return usernameOrEmail;
	}

	public void setUsernameOrEmail(String usernameOrEmail) {
		this.usernameOrEmail = usernameOrEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
