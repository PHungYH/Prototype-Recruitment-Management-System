package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table (name = "admins")
public class Admin {
    @Id
    @Column(name = "admin_id")
    private int id;
    private String username;
    
    @Column(name="password_hash")
    private String passwordHash;

    public int getId() {return id;}

    public String getUsername() {return username;}

    public String getPasswordHash() {return passwordHash;}

}
