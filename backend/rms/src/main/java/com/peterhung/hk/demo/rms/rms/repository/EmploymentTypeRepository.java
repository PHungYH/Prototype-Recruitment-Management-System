package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.EmploymentType;

public interface EmploymentTypeRepository extends JpaRepository<EmploymentType, Integer>{
    
}
