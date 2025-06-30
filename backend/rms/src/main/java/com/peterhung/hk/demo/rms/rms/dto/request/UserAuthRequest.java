package com.peterhung.hk.demo.rms.rms.dto.request;

import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;

// DTO = data transfer object
// Request json object for authentication
public class UserAuthRequest {
	private UserType userType;
	private String usernameOrEmail;
	private String password;

	public UserAuthRequest() {
	}

	public UserAuthRequest(UserType userType, String usernameOrEmail, String password) {
		this.userType = userType;
		this.usernameOrEmail = usernameOrEmail;
		this.password = password;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
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
