package com.peterhung.hk.demo.hrms.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	Employee findByEmailOrUsername(String email, String username);
}
