import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import appGlobal from '../utils/AppGlobal';
import { HTTPHelper } from '../utils/HTTPHelper';

const AdminManageNewResultDialog = (props: {
  toggleSetter: React.Dispatch<React.SetStateAction<boolean>>,
  toggle: boolean,
  jobApplicationIds: readonly number[],
  dataRefresher: () => void
}) => {
  const [interviewResult, setInterviewResult] = useState('reject');

  const handleSave = async () => {
    const response = await HTTPHelper.call<{
      result: boolean,
      errorCode?: number,
      message?: string
    }>(
      `${appGlobal.endpoint_job}/setInterviewResults`,
      'POST',
      {
        jobApplicationIds: props.jobApplicationIds,
        offer: interviewResult === 'offer'
      }
    );

    console.log(response);
    if (response.result) {
      alert("Updated");
      props.dataRefresher();
      props.toggleSetter(false);
    } else {
      if (response.errorCode) {
        alert("Failed to save, reason: " + response.message);
      }
    }
  };

  return (
    <Dialog open={props.toggle} onClose={() => props.toggleSetter(false)}>
      <DialogTitle>Set Interview Results</DialogTitle>
      <Divider />
      <DialogContent>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Interview Decision</FormLabel>
          <RadioGroup
            row
            value={interviewResult}
            onChange={(e) => setInterviewResult(e.target.value)}
          >
            <FormControlLabel value="offer" control={<Radio />} label="Offer" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleSetter(false)}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminManageNewResultDialog;