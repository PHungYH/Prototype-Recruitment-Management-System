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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import UpcomingScheduleTable from './UpcomingScheduleTable';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';

const AdminManageNewInterfaceDialog = (props: {
  toggleSetter: React.Dispatch<React.SetStateAction<boolean>>,
  toggle: boolean
  jobApplicationIds: readonly number[]
}) => {
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs());
  const [venue, setVenue] = useState('');

  const handleSave = async () => {
    console.log('Selected Date & Time:', dateTime?.toISOString());
    console.log('Text Input:', venue);

    if (dateTime?.isBefore(dayjs())) {
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
        interviewTime: dateTime?.toISOString(),
        interviewLocation: venue
      }
    );

    console.log(response);
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

export default AdminManageNewInterfaceDialog;