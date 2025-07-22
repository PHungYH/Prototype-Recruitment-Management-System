import type { ProfileResponse } from "./Applicant.interface";
import type { Job } from "./JobListResponse.interface";

export interface AppHistoryResponse {
  resultList: JobApplication[];
  result: boolean;
}

export interface JobApplication {
  id: number;
  interviewLocation: string;
  interviewTime: string;
  jobOpening: Job;
  status: Status;
  appliedTime: string;
  applicant: {
    id: number;
    email: string;
    username: string;
    profile: ProfileResponse;
    phoneNumber: string;
  };
}

export interface Status {
  id: number;
  name: string;
}