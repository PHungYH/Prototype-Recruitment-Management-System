package com.peterhung.hk.demo.rms.rms.dto;

// Response json object for user data
public class CurrentAdminUserResponse {
	private String username;

	public CurrentAdminUserResponse(String username) {
		this.username = username;
	}

	public String getUserName() {return username;}
}
