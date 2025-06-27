package com.peterhung.hk.demo.hrms.hrms.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.repository.EmployeeRepository;
import com.peterhung.hk.demo.hrms.hrms.service.Enum.UserType;

@Service 
public class AuthService { 
 
    private final EmployeeRepository employeeRepository; 
    private final PasswordEncoder passwordEncoder;
    private Employee lastAuthEmployee;
 
    public AuthService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) { 
        this.employeeRepository = employeeRepository; 
        this.passwordEncoder = passwordEncoder; 
    } 
 
    public boolean authenticate(UserType userType, String usernameOrEmail, String rawPassword) { 
        if (userType.equals(UserType.EMPLOYEE)) {
            Employee employee = employeeRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
            if (employee != null) {
                lastAuthEmployee = employee;
                return passwordEncoder.matches(rawPassword, employee.getPasswordHash());
            }
        }
        
        return false;
    }

    public Employee getLastAuthEmployee() {
        return lastAuthEmployee;
    }
}