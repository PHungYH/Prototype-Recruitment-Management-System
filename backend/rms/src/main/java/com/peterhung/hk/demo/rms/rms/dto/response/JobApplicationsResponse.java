package com.peterhung.hk.demo.rms.rms.dto.response;

import com.peterhung.hk.demo.rms.rms.model.JobApplication;

public class JobApplicationsResponse {
	private boolean result;
	private JobApplication[] resultList;
	
	public JobApplicationsResponse(boolean result, JobApplication[] applications) {
		this.result = result;
		this.resultList = applications;
	}

	public JobApplication[] getResultList() {
		return resultList;
	}

	public void setResultList(JobApplication[] applications) {
		this.resultList = applications;
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}
}
