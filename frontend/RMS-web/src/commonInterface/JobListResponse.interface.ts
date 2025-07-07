export interface JobListResponse {
  content: Job[];
  page: PageInfo;
}

export interface Job {
  id: number;
  jobTitle: string;
  belongingEmploymentType: EmploymentType;
  belongingDepartment: Department;
  jobDescription: string;
  jobRequirement: string;
  jobPostedDate: string; // ISO date string
  active: boolean;
}

export interface EmploymentType {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
