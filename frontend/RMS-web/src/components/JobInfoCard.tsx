import React from 'react';

interface JobInfoCardProps {
  title: string;
  department: string;
  jobType: string;
}

const JobInfoCard: React.FC<JobInfoCardProps> = ({ title, department, jobType }) => {
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-sm text-gray-600 flex items-center">
      </div>
      <div className="text-sm text-gray-600 flex items-start">
        <span className="mr-1">💼</span>
        <span>{department}</span>
      </div>
      <div className="pt-2 text-start">
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
          {jobType}
        </span>
      </div>
    </div>
  );
};

export default JobInfoCard;