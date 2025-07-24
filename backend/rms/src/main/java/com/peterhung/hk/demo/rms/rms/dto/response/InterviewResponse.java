package com.peterhung.hk.demo.rms.rms.dto.response;

import java.util.ArrayList;

public class InterviewResponse {
    private ArrayList<InterviewStruct> interviews;

    public InterviewResponse(ArrayList<InterviewStruct> interviews) {
        this.interviews = interviews;
    }

    public ArrayList<InterviewStruct> getInterviews() {
        return interviews;
    }

    public void setInterviews(ArrayList<InterviewStruct> interviews) {
        this.interviews = interviews;
    }
    
}
