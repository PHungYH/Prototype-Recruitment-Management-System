package com.peterhung.hk.demo.rms.rms.model;

import jakarta.persistence.*;

@Entity
@Table(name="followups")
public class FollowUp {
    @Id
    @Column(name="followup_id")
    private int id;
    @ManyToOne
    @JoinColumn(name="admin_id")
    Admin admin;
    @OneToOne
    @JoinColumn(name="job_application_id")
    JobApplication jobApplication;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Admin getAdmin() {
        return admin;
    }
    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
    public JobApplication getJobApplication() {
        return jobApplication;
    }
    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
    }
}
