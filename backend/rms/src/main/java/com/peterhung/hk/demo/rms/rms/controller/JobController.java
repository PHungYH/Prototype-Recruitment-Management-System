package com.peterhung.hk.demo.rms.rms.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
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
	public PagedModel<JobOpening> getActiveJobs(@RequestParam(defaultValue = "0") int page) {
		Page<JobOpening> resPage = jobService.getPaginatedActiveJobOpenings(page);
		return new PagedModel<>(resPage);
	}
}
