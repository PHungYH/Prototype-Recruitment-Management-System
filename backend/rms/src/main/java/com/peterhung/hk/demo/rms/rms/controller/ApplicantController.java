package com.peterhung.hk.demo.rms.rms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.model.ApplicantProfile;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.ApplicantService;



@RestController
@RequestMapping("/api/applicant")
public class ApplicantController {
    private final ApplicantService applicantService;
    private final JwtUtils jwtUtils;

    public ApplicantController(ApplicantService applicantService, JwtUtils jwtUtils) {
        this.applicantService = applicantService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getProfile")
    public ResponseEntity<?> getProfile(@RequestHeader String token) {
        String username = jwtUtils.getUsernameFromToken(token);
        if (username == null || username.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        ApplicantProfile applicantProfile = applicantService.getApplicantProfileByUsername(username);
        if (applicantProfile == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(applicantProfile);
    }
    
    @PostMapping("/saveProfile")
    public String saveProfile(@RequestBody String entity) {
        
        return entity;
    }
    
}
