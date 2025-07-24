import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  InputLabel
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import UpcomingScheduleTable from './UpcomingScheduleTable';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';

dayjs.extend(utc);

const AdminManageNewInterviewDialog = (props: {
  toggleSetter: React.Dispatch<React.SetStateAction<boolean>>,
  toggle: boolean
  jobApplicationIds: readonly number[]
  dataRefresher: () => void
}) => {
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs());
  const [venue, setVenue] = useState('');

  const handleSave = async () => {
    
    console.log("Date & time now: ", dayjs().utc());
    console.log('Selected Date & Time: ', dateTime?.utc());
    console.log('Text Input: ', venue);

    if (dayjs(dateTime).isBefore(dayjs())) {
      alert("Invalid date and time.");
      return;
    }

    if (venue.length === 0) {
      alert("Missing venue.");
      return;
    }

    const response = await HTTPHelper.call<{
      result: boolean,
      errorCode?: number,
      message?: string,
      missingIds?: number[]
    }>(
      `${appGlobal.endpoint_job}/addUpdateInterviewSchedule`,
      'POST',
      {
        jobApplicationIds: props.jobApplicationIds,
        interviewTime: dateTime?.utc().toISOString(),
        interviewLocation: venue
      }
    );

    console.log(response);
    if (response.result) {
      alert("Success.");
      props.dataRefresher();
      props.toggleSetter(false);
    } else {
      alert("Failed to add interview schedule.");
      if (response?.missingIds) {
        if (response.missingIds?.length > 0) {
          alert("Missing IDs: " + response.missingIds?.join(", "));
        }
      }
    }
  }
  

  return (
    <div>
      <Dialog open={props.toggle} onClose={() => props.toggleSetter(false)}>
        <DialogTitle>Schedule an Interview</DialogTitle>
        <Divider/>
        <DialogContent>
          <InputLabel>Upcoming Schedule</InputLabel>
          <UpcomingScheduleTable/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Interview Date & Time"
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              sx={{ marginTop: 2 }}
            />
          </LocalizationProvider>
          <TextField
            required
            label="Venue"
            fullWidth
            margin="dense"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.toggleSetter(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminManageNewInterviewDialog;