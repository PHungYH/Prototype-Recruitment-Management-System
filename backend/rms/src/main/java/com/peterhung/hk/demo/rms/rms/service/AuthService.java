package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.Admin;
import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.repository.AdminRepository;
import com.peterhung.hk.demo.rms.rms.repository.ApplicantRepository;

@Service 
public class AuthService { 
 
    private final AdminRepository adminRepository;
    private final ApplicantRepository applicantRepository;
    private final PasswordEncoder passwordEncoder;
    private Admin lastAuthAdmin;
    private Applicant lastAuthApplicant;
 
    public AuthService(AdminRepository adminRepository, ApplicantRepository applicantRepository, PasswordEncoder passwordEncoder) { 
        this.adminRepository = adminRepository; 
        this.applicantRepository = applicantRepository;
        this.passwordEncoder = passwordEncoder; 
    } 

    public boolean authenticateAdmin(String username, String rawPassword) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            lastAuthAdmin = admin;
            return passwordEncoder.matches(rawPassword, admin.getPasswordHash());
        }
        return false;
    }

    public boolean authenticateApplicant(String usernameOrEmail, String rawPassword) {
        Applicant applicant = applicantRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (applicant != null) {
            lastAuthApplicant = applicant;
            return passwordEncoder.matches(rawPassword, applicant.getPasswordHash());
        }
        return false;
    }

    public Admin getLastAuthAdmin() {
        return lastAuthAdmin;
    }
    
    public Applicant getLastAuthApplicant() {
        return lastAuthApplicant;
    }
}