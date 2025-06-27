package com.peterhung.hk.demo.hrms.hrms.dto;

public class UserResponse {
	private String profileName;

	public UserResponse(String profileName) {
		this.profileName = profileName;
	}

	public String getProfileName() {return profileName;}
}
