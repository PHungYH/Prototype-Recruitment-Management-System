import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import { TimeHelper } from '../utils/TimeHelper';

interface Column {
  id: 'jobAppId' | 'jobTitle' | 'interviewTime' | 'interviewLocation';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  {
    id: 'jobAppId',
    label: 'ID',
    align: 'right'
  },
  {
    id: 'jobTitle',
    label: 'Job Title',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'interviewTime',
    label: 'Interview Time (HKT)',
    minWidth: 170,
    align: 'right',
    format: (value: string) => TimeHelper.convertToHKTime(value),
  },
  {
    id: 'interviewLocation',
    label: 'Interview Location',
    align: 'right'
  },
];

interface RespData {
  jobApplicationId: number
  jobTitle: string
  interviewTime: string
  interviewLocation: string
}

interface Data {
  jobAppId: number
  jobTitle: string
  interviewTime: string
  interviewLocation: string
}

function createData(
  jobAppId: number,
  jobTitle: string,
  interviewTime: string, 
  interviewLocation: string,
): Data {
  return { jobAppId, jobTitle, interviewTime, interviewLocation };
}

export default function UpcomingScheduleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
     HTTPHelper.call<RespData[]>(
        `${appGlobal.endpoint_job}/getAllUpcomingInterviewSchedule`,
        'GET'
    ).then((response) => {
      console.log("UpcomingScheduleTable", response);
      const newRows = [] as Data[];
      response.forEach(row => {
        newRows.push(createData(row.jobApplicationId, row.jobTitle, row.interviewTime, row.interviewLocation));
      });

      setRows([...newRows]);
    }).catch((error) => {
      console.error("Error fetching data:", error);
      alert("Failed to retrieve applications.");
    });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.jobAppId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'string'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
