package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.peterhung.hk.demo.rms.rms.model.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer>{
	boolean existsByApplicantUsernameAndJobOpeningId(String applicantUsername, int jobOpeningId);
}
