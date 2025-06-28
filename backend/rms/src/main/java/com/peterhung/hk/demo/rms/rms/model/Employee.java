package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table (name = "employees")
public class Employee {
    @Id
    @Column(name = "emp_id")
    private int id;
    private String username;
    private String email;
    
    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;
    
    @Column(name="password_hash")
    private String passwordHash;

    @OneToOne
    @JoinColumn(name = "emp_prof_id")
    private EmployeeProfile profile;


    public int getId() {return id;}

    public String getEmail() {return email;}

    public String getUsername() {return username;}

    public Role getRole() {return role;}

    public String getPasswordHash() {return passwordHash;}

    public EmployeeProfile getProfile() {return profile;}
}
