package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table (name = "applicants")
public class Applicant {
    @Id
    @Column(name = "appl_id")
    private int id;
    private String username;
    private String email;
    
    @Column(name="password_hash")
    private String passwordHash;

    @OneToOne
    @JoinColumn(name = "appl_prof_id")
    private ApplicantProfile profile;


    public int getId() {return id;}

    public String getEmail() {return email;}

    public String getUsername() {return username;}

    public String getPasswordHash() {return passwordHash;}

    public ApplicantProfile getProfile() {return profile;}
}
