package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.ApplicationStatus;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Integer> {

}
