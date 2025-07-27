package com.peterhung.hk.demo.rms.rms.dto.request;

public class InterviewResultRequest {
    private int[] jobApplicationIds;
    private boolean offer;


    public InterviewResultRequest(int[] jobApplicationIds, boolean offer) {
        this.jobApplicationIds = jobApplicationIds;
        this.offer = offer;
    }
    public int[] getJobApplicationIds() {
        return jobApplicationIds;
    }
    public void setJobApplicationIds(int[] jobApplicationIds) {
        this.jobApplicationIds = jobApplicationIds;
    }
    public boolean isOffer() {
        return offer;
    }
    public void setOffer(boolean offer) {
        this.offer = offer;
    }   
}
