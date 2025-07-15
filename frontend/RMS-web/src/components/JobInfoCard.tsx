import React from 'react';
import UnderlineLink from './UnderlineLink';
import type { Job } from '../commonInterface/JobListResponse.interface';
import Button from '@mui/material/Button';
import appGlobal from '../utils/AppGlobal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface JobInfoCardProps {
  job: Job
  onClick: (job: Job) => void,
  isSelected: boolean,
  currentUserType: string;
}

const JobInfoCard: React.FC<JobInfoCardProps> = ({ job, onClick, isSelected, currentUserType }) => {
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const handleDelete = (job:Job) => {
    setShowConfirmDelete(false);
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
              <Button variant='text' onClick={() => onClick(job)}>✏️</Button>
              <Button variant='text' onClick={() => setShowConfirmDelete(true)}>🗑️</Button>
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

      <Dialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        closeAfterTransition={false}
      >
        <DialogTitle id="alert-dialog-title">
          Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Are you sure you want to delete this job posting?</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(job)}>Yes</Button>
          <Button onClick={() => setShowConfirmDelete(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobInfoCard;