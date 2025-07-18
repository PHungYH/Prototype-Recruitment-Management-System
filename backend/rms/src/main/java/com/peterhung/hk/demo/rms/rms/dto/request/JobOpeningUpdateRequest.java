package com.peterhung.hk.demo.rms.rms.dto.request;

public class JobOpeningUpdateRequest {
    private int jobId;
    private String title;
    private int employmentTypeId;
    private int departmentId;
    private String description;
    private String requirement;

    public int getJobId() {
        return jobId;
    }
    public void setJobId(int jobId) {
        this.jobId = jobId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public int getEmploymentTypeId() {
        return employmentTypeId;
    }
    public void setEmploymentTypeId(int employmentTypeId) {
        this.employmentTypeId = employmentTypeId;
    }
    public int getDepartmentId() {
        return departmentId;
    }
    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getRequirement() {
        return requirement;
    }
    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }
    
}
