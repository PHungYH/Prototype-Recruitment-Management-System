package com.peterhung.hk.demo.rms.rms.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.peterhung.hk.demo.rms.rms.model.*;
import com.peterhung.hk.demo.rms.rms.service.JobService;

@RestController
@RequestMapping("/api/job")
public class JobController {
	private final JobService jobService;
	
	public JobController(JobService jobService) {
		this.jobService = jobService;
	}

	@GetMapping("/getActiveJobs")
	public Page<JobOpening> getActiveJobs(@RequestParam(defaultValue = "0") int page) {
		return jobService.getPaginatedActiveJobOpenings(page);
	}
}
