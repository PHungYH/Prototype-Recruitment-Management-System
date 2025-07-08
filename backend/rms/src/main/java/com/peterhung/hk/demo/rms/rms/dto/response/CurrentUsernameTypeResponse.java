package com.peterhung.hk.demo.rms.rms.dto.response;

// Response json object for user data
public class CurrentUsernameTypeResponse {
	private String username;
	private String userType;

	public CurrentUsernameTypeResponse(String username, String userType) {
		this.username = username;
		this.userType = userType;
	}

	public String getUsername() {return username;}
	
	public String getUserType() {return userType;}
}
