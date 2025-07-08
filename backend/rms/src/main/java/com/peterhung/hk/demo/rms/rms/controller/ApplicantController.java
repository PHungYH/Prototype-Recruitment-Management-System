package com.peterhung.hk.demo.rms.rms.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.dto.response.SimpleBooleanResponse;
import com.peterhung.hk.demo.rms.rms.model.ApplicantProfile;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.ApplicantService;
import com.peterhung.hk.demo.rms.rms.service.Enum.UserType;



@RestController
@RequestMapping("/api/applicant")
public class ApplicantController {
    private static final Logger logger = LoggerFactory.getLogger(ApplicantController.class);
    private final ApplicantService applicantService;
    private final JwtUtils jwtUtils;

    public ApplicantController(ApplicantService applicantService, JwtUtils jwtUtils) {
        this.applicantService = applicantService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getProfile")
    public ResponseEntity<?> getProfile(@RequestHeader String token) {
        String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
        if (usernameType == null || !usernameType[1].equals(UserType.APPLICANT.toString())) 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        ApplicantProfile applicantProfile = applicantService.getApplicantProfileByUsername(usernameType[0]);
        if (applicantProfile == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(applicantProfile);
    }
    
    @PostMapping("/saveProfile")
    public ResponseEntity<?> saveProfile(@RequestHeader String token, @RequestBody ApplicantProfile applicantProfile) {
        String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
        if (usernameType == null || !usernameType[1].equals(UserType.APPLICANT.toString())) 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.ok(new SimpleBooleanResponse(applicantService.saveApplicantProfileByUsername(usernameType[0], applicantProfile)));
    }
}
