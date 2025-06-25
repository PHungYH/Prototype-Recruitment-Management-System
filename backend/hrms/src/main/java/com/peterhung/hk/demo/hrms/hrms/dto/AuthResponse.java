package com.peterhung.hk.demo.hrms.hrms.dto;

// Response json object for authentication
public class AuthResponse {
    private String token;
    public AuthResponse(String token) { this.token = token; }
    public String getToken() { return token; }
}
