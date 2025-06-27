package com.peterhung.hk.demo.hrms.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	Employee findByUsername(String username);
	Employee findByEmail(String email);
	Employee findByUsernameOrEmail(String username, String email);
}
