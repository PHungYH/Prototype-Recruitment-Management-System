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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public ApplicantProfile getProfile() {
        return profile;
    }

    public void setProfile(ApplicantProfile profile) {
        this.profile = profile;
    }


    
}
