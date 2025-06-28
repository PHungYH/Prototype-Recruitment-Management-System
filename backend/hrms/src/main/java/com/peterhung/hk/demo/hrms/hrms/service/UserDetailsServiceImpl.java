package com.peterhung.hk.demo.hrms.hrms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.repository.EmployeeRepository;

import java.util.Collections;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;
    private Employee employee;

    // TODO: Applicant impl 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employeeUser = null;
        employeeUser = employeeRepository.findByUsername(username);
        
        if (employeeUser == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        
        employee = employeeUser;

        return new org.springframework.security.core.userdetails.User(
                employeeUser.getUsername(),
                employeeUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Employee employeeUser = null;
        employeeUser = employeeRepository.findByEmail(email);
        
        if (employeeUser == null) {
            throw new UsernameNotFoundException("User Not Found with email: " + email);
        }
        
        employee = employeeUser;
        return new org.springframework.security.core.userdetails.User(
                employeeUser.getUsername(),
                employeeUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public Employee getEmployee() {
        return employee;
    }
}