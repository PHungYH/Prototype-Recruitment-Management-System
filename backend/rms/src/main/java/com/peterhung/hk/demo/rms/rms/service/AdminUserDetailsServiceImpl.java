package com.peterhung.hk.demo.rms.rms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.peterhung.hk.demo.rms.rms.model.Admin;
import com.peterhung.hk.demo.rms.rms.repository.AdminRepository;

import java.util.Collections;
@Service
public class AdminUserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AdminRepository adminRepository;
    private Admin admin;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin AdminUser = adminRepository.findByUsername(username);
        
        if (AdminUser == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        
        admin = AdminUser;

        return new org.springframework.security.core.userdetails.User(
                AdminUser.getUsername(),
                AdminUser.getPasswordHash(),
                Collections.emptyList()
        );
    }

    public Admin getAdmin() {
        return admin;
    }
}