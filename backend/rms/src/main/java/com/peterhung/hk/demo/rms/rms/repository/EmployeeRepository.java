package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	Employee findByUsername(String username);
	Employee findByEmail(String email);
	Employee findByUsernameOrEmail(String username, String email);
}
