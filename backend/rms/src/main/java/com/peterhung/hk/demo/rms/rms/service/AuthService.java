package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.Employee;
import com.peterhung.hk.demo.rms.rms.repository.EmployeeRepository;

@Service 
public class AuthService { 
 
    private final EmployeeRepository employeeRepository; 
    private final PasswordEncoder passwordEncoder;
    private Employee lastAuthEmployee;
 
    public AuthService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) { 
        this.employeeRepository = employeeRepository; 
        this.passwordEncoder = passwordEncoder; 
    } 
 
    public boolean authenticate(String usernameOrEmail, String rawPassword) { 
        Employee employee = employeeRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (employee != null) {
            lastAuthEmployee = employee;
            return passwordEncoder.matches(rawPassword, employee.getPasswordHash());
        }
        
        return false;
    }

    public Employee getLastAuthEmployee() {
        return lastAuthEmployee;
    }
}