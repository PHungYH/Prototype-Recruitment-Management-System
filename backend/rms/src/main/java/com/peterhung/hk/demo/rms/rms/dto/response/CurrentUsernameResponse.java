package com.peterhung.hk.demo.rms.rms.dto.response;

// Response json object for user data
public class CurrentUsernameResponse {
	private String username;

	public CurrentUsernameResponse(String username) {
		this.username = username;
	}

	public String getUsername() {return username;}
}
