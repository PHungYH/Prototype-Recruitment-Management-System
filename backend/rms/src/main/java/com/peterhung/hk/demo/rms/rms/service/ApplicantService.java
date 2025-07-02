package com.peterhung.hk.demo.rms.rms.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.dto.request.ApplicantRegistrationRequest;
import com.peterhung.hk.demo.rms.rms.model.*;
import com.peterhung.hk.demo.rms.rms.repository.ApplicantProfileRepository;
import com.peterhung.hk.demo.rms.rms.repository.ApplicantRepository;
import com.peterhung.hk.demo.rms.rms.exceptions.*;

@Service
public class ApplicantService {
    @Autowired
    private ApplicantRepository applicantRepository;
    @Autowired
    private ApplicantProfileRepository applicantProfileRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private int lastErrorCode;

    private static final Map<Integer, String> errorMessages = Map.of(
            1, "Null request",
            2, "Missing username",
            3, "Missing email",
            4, "Missing password",
            5, "Username must be between 3 and 20 characters",
            6, "Username must not contain special characters",
            7, "Password must be between 3 and 20 characters",
            8, "Username already exists",
            9, "Email already exists");


    public Applicant validateAndCreateUser(ApplicantRegistrationRequest registrationRequest)
            throws UserExistsException, InvalidUserDetailException {
        if (registrationRequest == null) {
            lastErrorCode = 1;
            throw new InvalidUserDetailException("Null request");
        }
        if (registrationRequest.getUsername().isEmpty()) {
            lastErrorCode = 2;
            throw new InvalidUserDetailException("Missing username");
        }
        if (registrationRequest.getEmail().isEmpty()) {
            lastErrorCode = 3;
            throw new InvalidUserDetailException("Missing email");
        }
        if (registrationRequest.getPassword().isEmpty()) {
            lastErrorCode = 4;
            throw new InvalidUserDetailException("Missing password");
        }
        // Username rule: length between 3 and 20 characters
        if (registrationRequest.getUsername().length() < 3 || registrationRequest.getUsername().length() > 20) {
            lastErrorCode = 5;
            throw new InvalidUserDetailException("Username must be between 3 and 20 characters");
        }
        // Username rule: no special characters allowed in username
        if (!registrationRequest.getUsername().matches("^[a-zA-Z0-9]+$")) {
            lastErrorCode = 6;
            throw new InvalidUserDetailException("Username must not contain special characters");
        }
        // Password rule: length between 8 and 20 characters
        if (registrationRequest.getPassword().length() < 8 || registrationRequest.getPassword().length() > 20) {
            lastErrorCode = 7;
            throw new InvalidUserDetailException("Password must be between 3 and 20 characters");
        }

        if (applicantExistsByUsername(registrationRequest.getUsername())) {
            lastErrorCode = 8;
            throw new UserExistsException("Username already exists: " + registrationRequest.getUsername());
        }
        if (applicantExistsByEmail(registrationRequest.getEmail())) {
            lastErrorCode = 9;
            throw new UserExistsException("Email already exists: " + registrationRequest.getEmail());
        }

        Applicant applicant = new Applicant();
        applicant.setProfile(applicantProfileRepository.save(new ApplicantProfile()));
        applicant.setUsername(registrationRequest.getUsername());
        applicant.setEmail(registrationRequest.getEmail());
        applicant.setPasswordHash(passwordEncoder.encode(registrationRequest.getPassword()));
        return applicantRepository.save(applicant);
    }

    public void removeUser(String username) {
        Applicant applicant = applicantRepository.findByUsername(username);
        if (applicant != null) {
            applicantRepository.delete(applicant);
        }
    }

    public boolean applicantExistsByUsername(String username) {
        return applicantRepository.existsByUsername(username);
    }

    public boolean applicantExistsByEmail(String email) {
        return applicantRepository.existsByEmail(email);
    }

    public int getLastErrorCode() {
        return lastErrorCode;
    }

    public String getLastErrorMessage() {
        return errorMessages.getOrDefault(lastErrorCode, "");
    }
}
