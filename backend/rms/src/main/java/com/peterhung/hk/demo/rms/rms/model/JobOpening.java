package com.peterhung.hk.demo.rms.rms.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name="job_openings")
public class JobOpening {
    @Id
    @Column(name="job_id")
    private int id;
    @Column(name="job_title")
    private String jobTitle;
    @ManyToOne
    @JoinColumn(name="emp_type_id")
    private EmploymentType belongingEmploymentType;
    @ManyToOne
    @JoinColumn(name="dept_id")
    private Department belongingDepartment;
    @Column(name="job_description")
    private String jobDescription;
    @Column(name="job_requirements")
    private String jobRequirement;
    @Column(name="job_posted_date")
    private LocalDate jobPostedDate;
    @Column(name="is_active")
    boolean isActive;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    public EmploymentType getBelongingEmploymentType() {
        return belongingEmploymentType;
    }
    public void setBelongingEmploymentType(EmploymentType belongingEmploymentType) {
        this.belongingEmploymentType = belongingEmploymentType;
    }
    public Department getBelongingDepartment() {
        return belongingDepartment;
    }
    public void setBelongingDepartment(Department belongingDepartment) {
        this.belongingDepartment = belongingDepartment;
    }
    public String getJobDescription() {
        return jobDescription;
    }
    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
    public String getJobRequirement() {
        return jobRequirement;
    }
    public void setJobRequirement(String jobRequirement) {
        this.jobRequirement = jobRequirement;
    }
    public LocalDate getJobPostedDate() {
        return jobPostedDate;
    }
    public void setJobPostedDate(LocalDate jobPostedDate) {
        this.jobPostedDate = jobPostedDate;
    }
    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
