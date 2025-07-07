import React from 'react';
import UnderlineLink from './UnderlineLink';
import type { Job } from '../commonInterface/JobListResponse.interface';

interface JobInfoCardProps {
  job: Job
  onClick: (job: Job) => void,
  isSelected: boolean;
}

const JobInfoCard: React.FC<JobInfoCardProps> = ({ job, onClick, isSelected }) => {
  return (
    <div
      className={`max-w-md mx-auto bg-white border rounded-lg shadow-md p-6 space-y-4 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
      }`} onClick={()=>onClick(job)}>
      <div className="flex justify-between items-start">
        <UnderlineLink className="text-lg font-semibold text-gray-800" onClickHandler={() => {}} >{job.jobTitle}</UnderlineLink>
      </div>
      <div className="text-sm text-gray-600 flex items-center">
      </div>
      <div className="text-sm text-gray-600 flex items-start">
        <span className="mr-1">💼</span>
        <span>{job.belongingDepartment.name}</span>
      </div>
      <div className="pt-2 text-start">
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
          {job.belongingEmploymentType.name}
        </span>
      </div>
    </div>
  );
};

export default JobInfoCard;