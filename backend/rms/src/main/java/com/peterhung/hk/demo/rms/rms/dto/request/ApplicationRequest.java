package com.peterhung.hk.demo.rms.rms.dto.request;

public class ApplicationRequest {
	private int jobId;
	
	public ApplicationRequest() {

	}

	public ApplicationRequest(int jobId) {
		this.jobId = jobId;
	}

	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
}
