package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.Admin;
import com.peterhung.hk.demo.rms.rms.repository.AdminRepository;

@Service 
public class AdminAuthService { 
 
    private final AdminRepository adminRepository; 
    private final PasswordEncoder passwordEncoder;
    private Admin lastAuthAdmin;
 
    public AdminAuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) { 
        this.adminRepository = adminRepository; 
        this.passwordEncoder = passwordEncoder; 
    } 
 
    public boolean authenticate(String username, String rawPassword) { 
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            lastAuthAdmin = admin;
            return passwordEncoder.matches(rawPassword, admin.getPasswordHash());
        }
        
        return false;
    }

    public Admin getLastAuthAdmin() {
        return lastAuthAdmin;
    }
}