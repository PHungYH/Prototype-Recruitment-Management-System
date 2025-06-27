package com.peterhung.hk.demo.hrms.hrms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.hrms.hrms.model.Employee;
import com.peterhung.hk.demo.hrms.hrms.repository.EmployeeRepository;
import com.peterhung.hk.demo.hrms.hrms.service.Enum.UserType;

import java.util.Collections;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserType currentUserType;
    @Autowired
    private EmployeeRepository employeeRepository;
    private Employee employee;
    
    public void setUserType(UserType userType) {
        currentUserType = userType;
    }

    // TODO: Applicant impl 
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employeeUser = null;
        if (currentUserType.equals(UserType.EMPLOYEE)) {
            employeeUser = employeeRepository.findByUsername(username);
        }
            
        if (employeeUser == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        
        if (currentUserType.equals(UserType.EMPLOYEE))
            employee = employeeUser;

        return new org.springframework.security.core.userdetails.User(
                currentUserType.equals(UserType.EMPLOYEE) ? employeeUser.getUsername() : employeeUser.getUsername(),
                currentUserType.equals(UserType.EMPLOYEE) ? employeeUser.getPasswordHash() : employeeUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    // TODO: Applicant impl 
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Employee employeeUser = null;
        if (currentUserType.equals(UserType.EMPLOYEE))
            employeeUser = employeeRepository.findByEmail(email);
        
        if (employeeUser == null) {
            throw new UsernameNotFoundException("User Not Found with email: " + email);
        }
        
        if (currentUserType.equals(UserType.EMPLOYEE))
            employee = employeeUser;
        return new org.springframework.security.core.userdetails.User(
                currentUserType.equals(UserType.EMPLOYEE) ? employeeUser.getUsername() : employeeUser.getUsername(),
                currentUserType.equals(UserType.EMPLOYEE) ? employeeUser.getPasswordHash() : employeeUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public Employee getEmployee() {
        return employee;
    }
}