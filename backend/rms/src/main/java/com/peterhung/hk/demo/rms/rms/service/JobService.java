package com.peterhung.hk.demo.rms.rms.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.controller.AuthController;
import com.peterhung.hk.demo.rms.rms.dto.request.InterviewRequest;
import com.peterhung.hk.demo.rms.rms.dto.request.JobOpeningAddUpdateRequest;
import com.peterhung.hk.demo.rms.rms.dto.response.InterviewStruct;
import com.peterhung.hk.demo.rms.rms.exceptions.InvalidJobApplicationException;
import com.peterhung.hk.demo.rms.rms.model.Applicant;
import com.peterhung.hk.demo.rms.rms.model.Department;
import com.peterhung.hk.demo.rms.rms.model.EmploymentType;
import com.peterhung.hk.demo.rms.rms.model.JobApplication;
import com.peterhung.hk.demo.rms.rms.model.JobOpening;
import com.peterhung.hk.demo.rms.rms.repository.*;

@Service
public class JobService {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private EmploymentTypeRepository employmentTypeRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
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
			4, "Applicant not found",
			5, "Missing data",
			6, "Invalid interview time",
			7, "Job application not found"
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

	public JobApplication[] getApplicationsByJobId(int jobId) {
		return jobApplicationRepository.findByJobOpeningId(jobId);
	}

	// If job ID not provided, treat as ADD action
	public boolean addUpdateJobOpening(JobOpeningAddUpdateRequest jobOpeningUpdateRequest) {
		Optional<JobOpening> jobOpening = Optional.empty();
		// Validations
		if (jobOpeningUpdateRequest.getJobId() != 0) {
			// Check for update
			jobOpening = jobOpeningRepository.findById(jobOpeningUpdateRequest.getJobId());
			if (jobOpening.isEmpty()) {
				lastErrorCode = 2;
				return false;
			}
		}

		if (jobOpeningUpdateRequest.getTitle().isEmpty()
			|| jobOpeningUpdateRequest.getDescription().isEmpty()
			|| jobOpeningUpdateRequest.getRequirement().isEmpty()) {
			lastErrorCode = 5;
			return false;
		}

		Optional<EmploymentType> newEmpType = employmentTypeRepository.findById(jobOpeningUpdateRequest.getEmploymentTypeId());
		if (newEmpType.isEmpty()) {
			lastErrorCode = 5;
			return false;
		}

		Optional<Department> newDept = departmentRepository.findById(jobOpeningUpdateRequest.getDepartmentId());
		if (newDept.isEmpty()) {
			lastErrorCode = 5;
			return false;
		}

		// Add/Update
		JobOpening opening;
		if (jobOpening.isEmpty()) {
			opening = new JobOpening();
			opening.setJobPostedDate(LocalDate.now());
			opening.setActive(true);
		} else
			opening = jobOpening.get(); 
		opening.setJobTitle(jobOpeningUpdateRequest.getTitle());
		opening.setBelongingEmploymentType(newEmpType.get());
		opening.setBelongingDepartment(newDept.get());
		opening.setJobDescription(jobOpeningUpdateRequest.getDescription());
		opening.setJobRequirement(jobOpeningUpdateRequest.getRequirement());

		jobOpeningRepository.save(opening);
		return true;
	}

	public boolean addUpdateInterviewSchedule(InterviewRequest interviewRequest, ArrayList<Integer> missingIds) {
		logger.info(String.format("Received %s | Current %s", interviewRequest.getInterviewTime(), ZonedDateTime.now(ZoneOffset.UTC).toLocalDateTime()));
		// Validations
		if (interviewRequest.getInterviewTime().isBefore(ZonedDateTime.now(ZoneOffset.UTC).toLocalDateTime())) {
			lastErrorCode = 6;
			return false;
		}
		if (interviewRequest.getInterviewLocation().isEmpty()) {
			lastErrorCode = 5;
			return false;
		}
		
		for (int id: interviewRequest.getJobApplicationIds()) {
			Optional<JobApplication> application = jobApplicationRepository.findById(id);
			if (application.isEmpty()) {
				missingIds.add(id);
			}

			application.get().setInterviewTime(interviewRequest.getInterviewTime());
			application.get().setInterviewLocation(interviewRequest.getInterviewLocation());
			application.get().setStatus(applicationStatusRepository.findByName("Interview"));
			jobApplicationRepository.save(application.get());
		}

		return true;
	}

	public ArrayList<InterviewStruct> getUpcomingInterviewScheduleByJob(int jobId) {
		JobApplication[] applications = getApplicationsByJobId(jobId);
		ArrayList<InterviewStruct> struct = new ArrayList<>();
		for (JobApplication application : applications) {
			if (application.getInterviewTime() != null && application.getInterviewTime().isAfter(LocalDateTime.now())) {
				struct.add(new InterviewStruct());
			}
		}
		return struct;
	}

	public boolean deactivateJobOpening(int jobId) throws InvalidJobApplicationException {
		Optional<JobOpening> jobOpening = jobOpeningRepository.findById(jobId);
		if (jobOpening.isEmpty()) {
			lastErrorCode = 2;
			throw new InvalidJobApplicationException(errorMessages.get(2));
		}
		// Update application status for all applications related to this job opening
		JobApplication[] applications = jobApplicationRepository.findByJobOpeningId(jobId);
		for (JobApplication application : applications) {
			application.setStatus(applicationStatusRepository.findByName("Closed"));
			jobApplicationRepository.save(application);
		}

		// Deactivate the job opening
		jobOpening.get().setActive(false);
		jobOpeningRepository.save(jobOpening.get());
		return true;
	}

	public int getLastErrorCode() {
		return lastErrorCode;
	}

	public String getLastErrorMessage() {
		return errorMessages.get(lastErrorCode);
	}

	public List<EmploymentType> getAvailableEmploymentTypes() {
		return employmentTypeRepository.findAll();
	}

	public List<Department> getAvailableDepartments() {
		return departmentRepository.findAll();
	}
}
