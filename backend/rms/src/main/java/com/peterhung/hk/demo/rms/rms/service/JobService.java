package com.peterhung.hk.demo.rms.rms.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.exceptions.InvalidJobApplicationException;
import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.model.JobApplication;
import com.peterhung.hk.demo.rms.rms.model.JobOpening;
import com.peterhung.hk.demo.rms.rms.repository.*;

@Service
public class JobService {
	@Autowired
	private JobOpeningRepository jobOpeningRepository;
	@Autowired
	private JobApplicationRepository jobApplicationRepository;
	@Autowired
	private ApplicantRepository applicantRepository;
	@Autowired
	private ApplicationStatusRepository applicationStatusRepository;
	
    private int lastErrorCode;
    private static final Map<Integer, String> errorMessages = Map.of(
            1, "Already applied for this job",
			2, "Job opening not found",
			3, "The job post has been closed",
			4, "Applicant not found"
	);

	public Page<JobOpening> getPaginatedActiveJobOpenings(int page) {
		Pageable pageable = PageRequest.of(page, 10);
		return jobOpeningRepository.findByIsActiveOrderByIdDesc(pageable, true);
	}

	public boolean checkJobApplicationExists(String applicantUsername, int jobId) {
		return jobApplicationRepository.existsByApplicantUsernameAndJobOpeningId(applicantUsername, jobId);
	}

	public boolean addApplication(String applicantUsername, int jobId) throws InvalidJobApplicationException{
		if (checkJobApplicationExists(applicantUsername, jobId)) {
			lastErrorCode = 1;
			throw new InvalidJobApplicationException(errorMessages.get(1));
		}

		Optional<JobOpening> jobOpening = jobOpeningRepository.findById(jobId);
		if (jobOpening.isEmpty()) {
			lastErrorCode = 2;
			throw new InvalidJobApplicationException(errorMessages.get(2));
		}

		if (!jobOpening.get().isActive()) {
			lastErrorCode = 3;
			throw new InvalidJobApplicationException(errorMessages.get(3));
		}

		Applicant applicant = applicantRepository.findByUsername(applicantUsername);
		if (applicant == null) {
			lastErrorCode = 4;
			throw new InvalidJobApplicationException(errorMessages.get(4));
		}

		JobApplication application = new JobApplication();
		application.setJobOpening(jobOpening.get());
		application.setApplicant(applicant);
		application.setAppliedTime(java.time.LocalDateTime.now());
		application.setStatus(applicationStatusRepository.findById(1).get());
		jobApplicationRepository.save(application);

		return true;
	}

	public JobApplication[] getApplicationsByApplicant(String applicantUsername) {
		return jobApplicationRepository.findByApplicantUsername(applicantUsername);
	}

	public int getLastErrorCode() {
		return lastErrorCode;
	}

	public String getLastErrorMessage() {
		return errorMessages.get(lastErrorCode);
	}
}
