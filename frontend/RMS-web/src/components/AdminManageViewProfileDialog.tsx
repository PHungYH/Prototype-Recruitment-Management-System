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
          {"View Applicant Profile"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>First Name:</strong> {props.applicantProfile?.firstname}
          </DialogContentText>
          <DialogContentText>
            <strong>Last Name:</strong> {props.applicantProfile?.lastname}
          </DialogContentText>
          <DialogContentText>
            <strong>Alias:</strong> {props.applicantProfile?.alias}
          </DialogContentText>
          <DialogContentText>
            <strong>ID Card (first 4 char.):</strong> {props.applicantProfile?.idcard}
          </DialogContentText>
          <DialogContentText>
            <strong>D.o.B (YYYY-MM-DD):</strong> {props.applicantProfile?.dateOfBirth.replace("T", "")}
          </DialogContentText>
          <DialogContentText>
            <strong>Gender:</strong> {props.applicantProfile?.gender}
          </DialogContentText>
          <DialogContentText>
            <strong>Contact:</strong> {props.applicantProfile?.phoneNumber}
          </DialogContentText>
          <DialogContentText>
            <strong>Address:</strong> {props.applicantProfile?.address}
          </DialogContentText>
          <DialogContentText>
            <strong>Nationality:</strong> {props.applicantProfile?.nationality}
          </DialogContentText>
          <DialogContentText>
            <strong>LinkedIn name:</strong> {props.applicantProfile?.linkedin}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.toggleSetter(false)}>
            Close
          </Button>
          <Button onClick={handleShowProfile} autoFocus>
            View LinkedIn
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AdminManageViewProfileDialog;