package com.peterhung.hk.demo.rms.rms.dto.request;

import java.time.LocalDateTime;

public class InterviewRequest {
    private int[] jobApplicationIds;
    private LocalDateTime interviewTime;
    private String interviewLocation;

    public InterviewRequest(int[] jobApplicationIds, LocalDateTime interviewTime, String interviewLocation) {
        this.jobApplicationIds = jobApplicationIds;
        this.interviewTime = interviewTime;
        this.interviewLocation = interviewLocation;
    }

    public int[] getJobApplicationIds() {
        return jobApplicationIds;
    }

    public void setJobApplicationIds(int[] jobApplicationIds) {
        this.jobApplicationIds = jobApplicationIds;
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
    
}
