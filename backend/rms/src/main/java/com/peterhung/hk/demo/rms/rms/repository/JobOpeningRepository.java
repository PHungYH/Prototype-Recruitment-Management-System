package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.JobOpening;

public interface JobOpeningRepository extends JpaRepository<JobOpening, Integer> {
	Page<JobOpening> findByIsActiveOrderByIdDesc(Pageable pageable, boolean isActive);
}
