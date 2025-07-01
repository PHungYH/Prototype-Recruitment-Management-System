package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.repository.ApplicantRepository;

public class ApplicantService {
    @Autowired
    private ApplicantRepository repository;

    public Applicant createUser(Applicant applicant) {
        return repository.save(applicant);
    }

}
