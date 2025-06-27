package com.peterhung.hk.demo.hrms.hrms.dto;

import com.peterhung.hk.demo.hrms.hrms.service.Enum.UserType;

// Response json object for user data
public class CurrentUserResponse {
	private UserType userType;
	private String username;
	private String profileLastName;
	private String profileFirstName;

	public CurrentUserResponse(UserType userType, String username, String profileLastName, String profileFirstName) {
		this.userType = userType;
		this.username = username;
		this.profileLastName = profileLastName;
		this.profileFirstName = profileFirstName;
	}

	public UserType getUserType() {return userType;}

	public String getUserName() {return username;}

	public String getProfileLastName() {return profileLastName;}

	public String getProfileFirstName() {return profileFirstName;}
}
