import React from 'react';
import JobInfoCard from './JobInfoCard';

interface JobInfo {
  title: string;
  department: string;
  jobType: string;
}

interface JobListProps {
  jobs: JobInfo[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="w-full md:w-1/3 h-full overflow-y-auto p-4">
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <JobInfoCard
            key={index}
            title={job.title}
            department={job.department}
            jobType={job.jobType}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;