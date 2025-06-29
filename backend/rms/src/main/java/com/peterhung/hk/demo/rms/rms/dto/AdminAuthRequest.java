package com.peterhung.hk.demo.rms.rms.dto;

// DTO = data transfer object
// Request json object for authentication
// Example: {"username": "132456789", "password": "pass"}
public class AdminAuthRequest {
	private String username;
	private String password;

	public AdminAuthRequest() {
	}

	public AdminAuthRequest(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
