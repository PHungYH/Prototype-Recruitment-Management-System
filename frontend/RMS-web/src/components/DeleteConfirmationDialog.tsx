import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


type DeleteConfirmationDialogProps = {
  getShow: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  promiseCallbackOnYes?: () => Promise<void>;
}
const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({getShow, setShow, promiseCallbackOnYes}) => {

  return (
    <div>
      <Dialog
        open={getShow}
        onClose={() => setShow(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        closeAfterTransition={false}
      >
        <DialogTitle id="alert-dialog-title">
          Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Are you sure you want to deactivate this job posting?</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={promiseCallbackOnYes}>Yes</Button>
          <Button onClick={() => setShow(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteConfirmationDialog;