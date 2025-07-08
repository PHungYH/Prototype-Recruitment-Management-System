import React, { useEffect, useState } from 'react';
import JobInfoCard from './JobInfoCard';
import type { Job } from '../commonInterface/JobListResponse.interface';
import appGlobal from '../utils/AppGlobal';
import { HTTPHelper } from '../utils/HTTPHelper';
import { Button, Divider } from '@mui/material';

interface CurrentUsernameTypeResponse {
  username: string,
  userType: string;
}

interface JobListProps {
  jobs: Job[],
  currentPage: number,
  totalPage: number,
  onPageChanged: (page: number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentPage, totalPage, onPageChanged }) => {
  const [currentJob, setCurrentJob] = useState<Job>({} as Job);
  const [currentUserType, setCurrentUserType] = useState('');
  const handleJob = (job: Job): void => {
    setCurrentJob(job);
  }

  useEffect(() => {
    // Show first job by default
    if (jobs.length > 0)
      setCurrentJob(jobs[0]);

    // Set authenticated user type
    if (localStorage.getItem(appGlobal.storage_key_token)) {
      HTTPHelper.call<CurrentUsernameTypeResponse>(
        `${appGlobal.endpoint_auth}/getLoggedInUsernameType`,
        'GET'
      ).then((response) => {
        setCurrentUserType(response?.userType);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }

  }, []);

  return (
    <div className='flex flex-col md:flex-row w-full h-full'>
      <div className="w-full md:w-1/3 h-full overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Up pagination */}
          <div className='flex flex-row justify-center'>
            {currentPage > 0 && <Button variant='contained' style={{margin: 3}} onClick={() => onPageChanged(currentPage-1)}>{'<'} Prev</Button>}

            {currentPage - 1 > 0 && <Button variant='outlined' style={{margin: 3}} onClick={()=> onPageChanged(currentPage-2)}>{currentPage-1}</Button>}
            {currentPage > 0 && <Button variant='outlined' style={{margin: 3}} onClick={()=> onPageChanged(currentPage-1)}>{currentPage}</Button>}
            <Button variant='outlined' style={{margin: 3, textDecoration: 'underline'}}>{currentPage + 1}</Button>
            
            {currentPage < totalPage - 1 && <Button variant='outlined' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>{currentPage + 2}</Button>}
            {currentPage + 1 < totalPage - 1 && <Button variant='outlined' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>{currentPage + 3}</Button>}
            {currentPage < totalPage - 1 && <Button variant='contained' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>Next {'>'}</Button>}
          </div>

          {jobs.map((job, index) => (
            <JobInfoCard
              key={index}
              job={job}
              onClick={() => handleJob(job)}
              isSelected={currentJob.id === job.id}
            />
          ))}

          {/* Down pagination */}
          <div className='flex flex-row justify-center'>
            {currentPage > 0 && <Button variant='contained' style={{margin: 3}} onClick={() => onPageChanged(currentPage-1)}>{'<'} Prev</Button>}

            {currentPage - 1 > 0 && <Button variant='outlined' style={{margin: 3}} onClick={()=> onPageChanged(currentPage-2)}>{currentPage-1}</Button>}
            {currentPage > 0 && <Button variant='outlined' style={{margin: 3}} onClick={()=> onPageChanged(currentPage-1)}>{currentPage}</Button>}
            <Button variant='outlined' style={{margin: 3, textDecoration: 'underline'}}>{currentPage + 1}</Button>
            
            {currentPage < totalPage - 1 && <Button variant='outlined' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>{currentPage + 2}</Button>}
            {currentPage + 1 < totalPage - 1 && <Button variant='outlined' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>{currentPage + 3}</Button>}
            {currentPage < totalPage - 1 && <Button variant='contained' style={{margin: 3}} onClick={() => onPageChanged(currentPage+1)}>Next {'>'}</Button>}
          </div>
        </div>
      </div>
      <div className='border-l-4 border-gray-200 pl-4 my-4'>
        <h1 className='text-3xl'>{currentJob?.jobTitle}</h1>
        <Divider/>
        <h2>Mode: {currentJob?.belongingEmploymentType?.name}</h2>
        <h2>Department: {currentJob?.belongingDepartment?.name}</h2>
        <h2>Description: {currentJob?.jobDescription}</h2>
        <h2>Requirements: {currentJob.jobRequirement}</h2>

        {currentUserType === '' && <h2 className='text-red-500'>Login to apply.</h2>}
      </div>
    </div>
  );
};

export default JobList;