package com.peterhung.hk.demo.hrms.hrms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.repository.EmployeeRepository;

import java.util.Collections;
@Service
public class EmployeeUserDetailsService  implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;
    private Employee employee;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee user = employeeRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Employee user = employeeRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public Employee getEmployee() {
        return employee;
    }
}