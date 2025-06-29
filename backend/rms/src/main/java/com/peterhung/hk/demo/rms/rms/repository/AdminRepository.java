package com.peterhung.hk.demo.rms.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peterhung.hk.demo.rms.rms.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
	Admin findByUsername(String username);
}
