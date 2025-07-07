import React, { useEffect, useState } from 'react';
import JobInfoCard from './JobInfoCard';
import type { Job } from '../commonInterface/JobListResponse.interface';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const [currentJob, setCurrentJob] = useState<Job>({} as Job);
  const handleJob = (job: Job): void => {
    setCurrentJob(job);
  }

  useEffect(() => {
    if (jobs.length > 0)
      setCurrentJob(jobs[0]);
  }, []);

  return (
    <div className='flex flex-col md:flex-row w-full h-full'>
      <div className="w-full md:w-1/3 h-full overflow-y-auto p-4">
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <JobInfoCard
              key={index}
              job={job}
              onClick={() => handleJob(job)}
              isSelected={currentJob.id === job.id}
            />
          ))}
        </div>
      </div>
      <div className='border-l-4 border-gray-200 pl-4 my-4'>
        <h1 className='text-3xl'>{currentJob?.jobTitle}</h1>
        <h2>Mode: {currentJob?.belongingEmploymentType?.name}</h2>
        <h2>Department: {currentJob?.belongingDepartment?.name}</h2>
        <h2>Description: {currentJob?.jobDescription}</h2>
        <h2>Requirements: {currentJob.jobRequirement}</h2>
      </div>
    </div>
  );
};

export default JobList;