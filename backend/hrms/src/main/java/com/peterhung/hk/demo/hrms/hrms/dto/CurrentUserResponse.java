package com.peterhung.hk.demo.hrms.hrms.dto;

// Response json object for user data
public class CurrentUserResponse {
	private String username;
	private String profileLastName;
	private String profileFirstName;

	public CurrentUserResponse(String username, String profileLastName, String profileFirstName) {
		this.username = username;
		this.profileLastName = profileLastName;
		this.profileFirstName = profileFirstName;
	}

	public String getUserName() {return username;}

	public String getProfileLastName() {return profileLastName;}

	public String getProfileFirstName() {return profileFirstName;}
}
