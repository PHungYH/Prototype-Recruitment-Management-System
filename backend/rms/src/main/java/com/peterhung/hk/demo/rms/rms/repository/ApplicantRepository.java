package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.Applicant;

public interface ApplicantRepository extends JpaRepository<Applicant, Integer> {
	Applicant findByUsername(String username);
	Applicant findByEmail(String email);
	Applicant findByUsernameOrEmail(String username, String email);
}
