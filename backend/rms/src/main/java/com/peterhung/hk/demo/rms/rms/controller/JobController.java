package com.peterhung.hk.demo.rms.rms.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.annotations.RequireAdminToken;
import com.peterhung.hk.demo.rms.rms.annotations.RequireApplicantToken;
import com.peterhung.hk.demo.rms.rms.dto.request.*;
import com.peterhung.hk.demo.rms.rms.dto.response.*;
import com.peterhung.hk.demo.rms.rms.exceptions.InvalidJobApplicationException;
import com.peterhung.hk.demo.rms.rms.model.*;
import com.peterhung.hk.demo.rms.rms.securityUtils.JwtUtils;
import com.peterhung.hk.demo.rms.rms.service.JobService;

@RestController
@RequestMapping("/api/job")
public class JobController {
	private final JobService jobService;
	private final JwtUtils jwtUtils;
	
	public JobController(JobService jobService, JwtUtils jwtUtils) {
		this.jobService = jobService;
		this.jwtUtils = jwtUtils;
	}

	@GetMapping("/getActiveJobs")
	public PagedModel<JobOpening> getActiveJobs(@RequestParam(defaultValue = "0") int page) {
		Page<JobOpening> resPage = jobService.getPaginatedActiveJobOpenings(page);
		return new PagedModel<>(resPage);
	}

	@PostMapping("/applyJob")
    @RequireApplicantToken
    public ResponseEntity<?> applyJob(@RequestHeader String token, @RequestBody JobOpeningRequest request) {
        String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
        try {
			jobService.addApplication(usernameType[0], request.getJobId());
		} catch (InvalidJobApplicationException e) {
			return ResponseEntity.ok(new SimpleErrorResponse(jobService.getLastErrorCode(), jobService.getLastErrorMessage()));
		}
		
		return ResponseEntity.ok(new SimpleBooleanResponse(true));
    }

	@GetMapping("/getAppliedJobs")
	@RequireApplicantToken
	public ResponseEntity<?> getAppliedJobs(@RequestHeader String token) {
		String[] usernameType = jwtUtils.getUsernameTypeFromToken(token);
		JobApplication[] applications = jobService.getApplicationsByApplicant(usernameType[0]);
		if (applications == null || applications.length == 0) {
			return ResponseEntity.ok(new JobApplicationsResponse(false, new JobApplication[0]));
		}
		return ResponseEntity.ok(new JobApplicationsResponse(true, applications));
	}

	@DeleteMapping("/deleteJob")
	@RequireAdminToken
	public ResponseEntity<?> deleteJob(@RequestHeader String token, @RequestBody JobOpeningRequest request) {
		try {
			jobService.deleteJobOpening(request.getJobId());
		} catch (InvalidJobApplicationException e) {
			return ResponseEntity.ok(new SimpleErrorResponse(jobService.getLastErrorCode(), jobService.getLastErrorMessage()));
		}
		
		return ResponseEntity.ok(new SimpleBooleanResponse(true));
	}
}
