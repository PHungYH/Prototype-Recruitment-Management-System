package com.peterhung.hk.demo.hrms.hrms.model;

import jakarta.persistence.*;

@Entity
@Table (name = "employees")
public class Employee {
    @Id
    @Column(name = "emp_id")
    private int id;
    private String username;
    
    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;
    
    @Column(name="password_hash")
    private String passwordHash;


    public int getId() {return id;}

    public String getUserName() {return username;}

    public Role getRole() {return role;}

    public String getPasswordHash() {return passwordHash;}


}
