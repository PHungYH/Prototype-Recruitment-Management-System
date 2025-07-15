package com.peterhung.hk.demo.rms.rms.dto.request;

public class JobOpeningRequest {
	private int jobId;
	
	public JobOpeningRequest() {

	}

	public JobOpeningRequest(int jobId) {
		this.jobId = jobId;
	}

	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
}
