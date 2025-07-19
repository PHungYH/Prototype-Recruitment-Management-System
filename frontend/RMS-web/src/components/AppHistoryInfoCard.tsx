import React from 'react';
import type { JobApplication } from '../commonInterface/AppHistoryResponse.interface';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


type AppHistoryInfoCardProps = {
  appHistory: JobApplication
}

const AppHistoryInfoCard: React.FC<AppHistoryInfoCardProps> = ({ appHistory }) => {
  const [showJobDetails, setShowJobDetails] = React.useState(false);

  return (
    <div className=' bg-white my-2 mx-2 border rounded-lg shadow-md p-6 space-y-4 transition-all border-gray-200'>
      <div className='flex flex-row'>
        <div className='w-1/2'>
          <h1 className='text-2xl font-bold'>{appHistory?.jobOpening?.jobTitle}</h1>
        </div>
        <div className='w-1/2'>
          <span className={`inline-block bg-${appHistory.status.name == 'Closed'?'gray-500' :'blue-600'} text-white text-xs font-semibold px-4 py-1 rounded-full`}>
          {appHistory.status.name}
        </span>
          <p className='text-gray-600'>Mode: {appHistory?.jobOpening?.belongingEmploymentType?.name}</p>
          <p className='text-gray-600'>Interview Location: {appHistory.interviewLocation? appHistory.interviewLocation : "To be announced"}</p>
          <p className='text-gray-600'>Interview Location: {appHistory.interviewTime? appHistory.interviewTime.replace("T", " ") : "To be announced"}</p>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        <h1 className='mr-4'>Applied Date: {appHistory?.appliedTime.replace("T", " ")}</h1>
        <Button variant="outlined" onClick={() => setShowJobDetails(true)}>
          Open Job Details
        </Button>
      </div>
      <Dialog
        open={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        closeAfterTransition={false}
      >
        <DialogTitle id="alert-dialog-title">
          {appHistory?.jobOpening?.jobTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Department:</strong> {appHistory?.jobOpening?.belongingDepartment?.name}
          </DialogContentText>
          <DialogContentText>
              <strong>Employment Type:</strong> {appHistory?.jobOpening?.belongingEmploymentType?.name}
          </DialogContentText>
          <DialogContentText>
            <strong>Job Description:</strong> {appHistory?.jobOpening?.jobDescription}
          </DialogContentText>
          <DialogContentText>
            <strong>Job Requirement:</strong> {appHistory?.jobOpening?.jobRequirement}
          </DialogContentText>
          <DialogContentText>
              <strong>Posted Date:</strong> {appHistory?.jobOpening?.jobPostedDate}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowJobDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppHistoryInfoCard;