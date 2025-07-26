package com.peterhung.hk.demo.rms.rms.dto.response;

import java.time.LocalDateTime;

public class InterviewStruct {
    private int jobApplicationId;
    private String jobTitle;
    private LocalDateTime interviewTime;
    private String interviewLocation;


    public InterviewStruct(int jobApplicationId, String jobTitle, LocalDateTime interviewTime,
            String interviewLocation) {
        this.jobApplicationId = jobApplicationId;
        this.jobTitle = jobTitle;
        this.interviewTime = interviewTime;
        this.interviewLocation = interviewLocation;
    }

    public String getJobTitle() {
        return jobTitle;
    }


    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }


    public LocalDateTime getInterviewTime() {
        return interviewTime;
    }


    public void setInterviewTime(LocalDateTime interviewTime) {
        this.interviewTime = interviewTime;
    }


    public String getInterviewLocation() {
        return interviewLocation;
    }


    public void setInterviewLocation(String interviewLocation) {
        this.interviewLocation = interviewLocation;
    }

    public int getJobApplicationId() {
        return jobApplicationId;
    }

    public void setJobApplicationId(int jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
    }

}
