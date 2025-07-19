import { useState } from 'react';
import UnderlineLink from './UnderlineLink';
import type { Job } from '../commonInterface/JobListResponse.interface';
import Button from '@mui/material/Button';
import appGlobal from '../utils/AppGlobal';
import { HTTPHelper } from '../utils/HTTPHelper';
import JobOpeningEditFormDialog from './JobOpeningEditFormDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

interface MarkInactiveResponse {
  result: boolean,
  errorCode?: string,
  message?: string;
}

interface JobInfoCardProps {
  job: Job
  onClick: (job: Job) => void,
  isSelected: boolean,
  currentUserType: string;
}

const JobInfoCard: React.FC<JobInfoCardProps> = ({ job, onClick, isSelected, currentUserType }) => {
  const [showConfirmMarkInactive, setShowConfirmMarkInactive] = useState(false);
  const [showEditJobOpening, setShowEditJobOpening] = useState(false);

  const handleMarkInactive = async() => {
    setShowConfirmMarkInactive(false);
    const response = await HTTPHelper.call<MarkInactiveResponse>(
      `${appGlobal.endpoint_job}/deactivateJob`,
      'POST',
      { jobId: job.id }
    );
    
    console.log(response);
    if (response.result) {
      alert("Job successfully marked inactive.");
      window.location.reload();
    } else {
      alert("Failed to mark inactive for the job: \nReason: " + response.message);
    }
  }

  return (
    <div
      className={`max-w-md mx-auto bg-white border rounded-lg shadow-md p-6 space-y-4 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
      }`} onClick={()=>onClick(job)}>
      <div className='flex flex-row items-start'>
        <div className='w-48'>
          <p className='text-gray-400'>{job.jobPostedDate}</p>
        </div>
        <div className='grow flex flex-row justify-end'>
          {currentUserType === appGlobal.userType_ADMIN && (
            <>
              <Button variant='text' onClick={() => setShowEditJobOpening(true)}>✏️</Button>
              <Button variant='text' onClick={() => setShowConfirmMarkInactive(true)}>📩</Button>
            </>
          )}
        </div>
      </div>
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

      <DeleteConfirmationDialog getShow={showConfirmMarkInactive} setShow={setShowConfirmMarkInactive} promiseCallbackOnYes={handleMarkInactive}/>
      <JobOpeningEditFormDialog getShow={showEditJobOpening} setShow={setShowEditJobOpening} job={job}/>

    </div>
  );
};

export default JobInfoCard;