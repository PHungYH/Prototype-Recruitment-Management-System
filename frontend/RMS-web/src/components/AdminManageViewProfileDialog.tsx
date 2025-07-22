import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { ProfileResponse } from '../commonInterface/Applicant.interface';

const AdminManageViewProfileDialog = (props: {
  toggleSetter: React.Dispatch<React.SetStateAction<boolean>>, 
  toggle: boolean, 
  applicantProfile: ProfileResponse | undefined}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleShowProfile = () => {
    if (props.applicantProfile)
      window.open("https://linkedin.com/in/" + props.applicantProfile.linkedin, "_blank");
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.toggle}
        onClose={() => props.toggleSetter(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.toggleSetter(false)}>
            Close
          </Button>
          <Button onClick={handleShowProfile} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AdminManageViewProfileDialog;