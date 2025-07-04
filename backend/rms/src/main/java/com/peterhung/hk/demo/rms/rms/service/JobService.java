package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.JobOpening;
import com.peterhung.hk.demo.rms.rms.repository.JobOpeningRepository;

@Service
public class JobService {
	@Autowired
	private JobOpeningRepository jobOpeningRepository;

	public Page<JobOpening> getPaginatedActiveJobOpenings(int page) {
		Pageable pageable = PageRequest.of(page, 10);
		return jobOpeningRepository.findByIsActive(pageable, true);
	}
}
