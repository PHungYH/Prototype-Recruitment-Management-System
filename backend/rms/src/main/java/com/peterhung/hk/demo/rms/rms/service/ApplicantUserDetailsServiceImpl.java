package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.repository.ApplicantRepository;

import java.util.Collections;
@Service
public class ApplicantUserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private ApplicantRepository applicantRepository;
    private Applicant applicant;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Applicant applicantUser = applicantRepository.findByUsername(username);
        
        if (applicantUser == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        
        applicant = applicantUser;

        return new org.springframework.security.core.userdetails.User(
                applicantUser.getUsername(),
                applicantUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Applicant applicantUser = applicantRepository.findByEmail(email);
        
        if (applicantUser == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + email);
        }
        
        applicant = applicantUser;

        return new org.springframework.security.core.userdetails.User(
                applicantUser.getUsername(),
                applicantUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public Applicant getApplicant() {
        return applicant;
    }
}