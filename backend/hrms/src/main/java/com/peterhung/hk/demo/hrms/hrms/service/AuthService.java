package com.peterhung.hk.demo.hrms.hrms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.repository.EmployeeRepository;

@Service 
public class AuthService { 
 
    private final EmployeeRepository employeeRepository; 
    private final PasswordEncoder passwordEncoder;
 
    public AuthService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) { 
        this.employeeRepository = employeeRepository; 
        this.passwordEncoder = passwordEncoder; 
    } 
 
    public boolean authenticate(String usernameOrEmail, String rawPassword) { 
        Employee employee = employeeRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (employee != null) {
            return passwordEncoder.matches(rawPassword, employee.getPasswordHash());
        }
        return false;
    }
}