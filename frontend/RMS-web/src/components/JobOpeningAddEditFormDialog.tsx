import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Job } from '../commonInterface/JobListResponse.interface';
import { Divider, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';

interface EmploymentType {
  id:number
  name:string
}

interface EmploymentTypesResponse {
  employmentTypes:EmploymentType[]
}

interface Department {
  id:number
  name:string
}

interface DepartmentsResponse {
  departments:Department[]
}

interface UpdateResponse {
  result:boolean
  errorCode?:number
  message?:string
}

type JobOpeningEditFormProps = {
    job?:Job,
    getShow:boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>;
}
const JobOpeningAddEditFormDialog:React.FC<JobOpeningEditFormProps> = ({job, getShow, setShow}) => {
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([] as EmploymentType[]);
  const [departments, setDepartments] = useState<Department[]>([] as Department[]);

  useEffect(() => {
    // Init form required data
    if (getShow) {
      HTTPHelper.call<EmploymentTypesResponse>(
        `${appGlobal.endpoint_job}/getAvailableEmploymentTypes`,
        'GET'
      ).then((response) => {
        setEmploymentTypes(response.employmentTypes);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });

      HTTPHelper.call<DepartmentsResponse>(
        `${appGlobal.endpoint_job}/getAvailableDepartments`,
        'GET'
      ).then((response) => {
        setDepartments(response.departments);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  }, [getShow]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);

    HTTPHelper.call<UpdateResponse>(
      `${appGlobal.endpoint_job}/addUpdateJob`,
      'POST',
      {
        jobId: job?.id,
        title: formJson?.title,
        employmentTypeId: formJson?.employmentTypeId,
        departmentId: formJson?.departmentId,
        description: formJson?.description,
        requirement: formJson?.requirement
      }
    ).then((response) => {
      if (response.result) {
        alert("Update success.")
        window.location.reload();
      } else {
        alert("Failed to update. Reason: " + response.message);
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
      alert("Failed to update.")
    });
    
  };

  return (
    <Fragment>
      <Dialog open={getShow} onClose={()=>setShow(false)}>
        <DialogTitle>✏️ {job? 'Edit' : 'Add'} Job Opening</DialogTitle>
        <Divider/>
        <DialogContent sx={{ paddingBottom: 0, width:'30vw'}}>
          <form onSubmit={handleSubmit} >
            <InputLabel id="title-label" required>Title</InputLabel>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              fullWidth
              variant="standard"
              defaultValue={job? job.jobTitle : ''}
            />

            <InputLabel id="employment-type-label" required>Employment Type</InputLabel>
            <Select defaultValue={job? job.belongingEmploymentType.id : 1} name='employmentTypeId'>
              {employmentTypes.length == 0 && <MenuItem value={job? job.belongingEmploymentType.id : 1}>...</MenuItem>}
              {employmentTypes.map((empType) => (
                <MenuItem value={empType.id}>{empType.name}</MenuItem>
              ))}
            </Select>

            <InputLabel id="department-type-label" required>Department Type</InputLabel>
            <Select defaultValue={job? job.belongingDepartment.id : 1} name='departmentId'>
              {departments.length == 0 && <MenuItem value={job? job.belongingDepartment.id : 1}>...</MenuItem>}
              {departments.map((dept) => (
                <MenuItem value={dept.id}>{dept.name}</MenuItem>
              ))}
            </Select>

            <InputLabel id="description-label" required>Description</InputLabel>
            <TextareaAutosize
              required
              style={{ width: '100%', border:'solid', borderWidth: 'thin' }}
              minRows={3}
              defaultValue={job? job.jobDescription : ''}
              name='description'
            />

            <InputLabel id="requirements-label" required>Requirements</InputLabel>
            <TextareaAutosize
              required
              style={{ width: '100%', border:'solid', borderWidth: 'thin' }}
              minRows={3}
              defaultValue={job? job.jobRequirement: ''}
              name='requirement'
            />

            <DialogActions>
              <Button onClick={()=>setShow(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default JobOpeningAddEditFormDialog;