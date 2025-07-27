import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import { createData, type Data } from '../commonInterface/ApplicationTableData.interface';
import type { AppHistoryResponse } from '../commonInterface/AppHistoryResponse.interface';
import appGlobal from '../utils/AppGlobal';
import { HTTPHelper } from '../utils/HTTPHelper';
import AdminManageViewProfileDialog from './AdminManageViewProfileDialog';
import type { ProfileResponse } from '../commonInterface/Applicant.interface';
import AdminManageNewInterviewDialog from './AdminManageNewInterviewDialog';
import { TimeHelper } from '../utils/TimeHelper';
import AdminManageNewResultDialog from './AdminManageNewResultDialog';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'fullname',
    numeric: false,
    disablePadding: true,
    label: 'Full Name (first, last)',
  },
  {
    id: 'alias',
    numeric: false,
    disablePadding: false,
    label: 'Alias',
  },
  {
    id: 'idcard',
    numeric: false,
    disablePadding: false,
    label: 'ID Card (first 4 char.)',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Contact',
  },
  {
    id: 'appliedTimestamp',
    numeric: true,
    disablePadding: true,
    label: 'Applied Time (HKT)',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'interviewLocation',
    numeric: false,
    disablePadding: false,
    label: 'Interview Loc.'
  },
  {
    id: 'interviewTimestamp',
    numeric: true,
    disablePadding: false,
    label: 'Interview Time (HKT)'
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
  onSetNewResult: React.Dispatch<React.SetStateAction<boolean>>;
  onSetNewInterview: React.Dispatch<React.SetStateAction<boolean>>;
  onSetViewProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowApplicantTable: React.Dispatch<React.SetStateAction<boolean>>;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Applicants
        </Typography>
      )}

      {numSelected === 0 ? null : (
        <div className='flex flex-row'>
          {numSelected === 1 ? (
            <>
              <Button variant='text' onClick={() => props.onSetNewResult(true)}>New Result</Button>
              <Button variant='text' onClick={() => props.onSetNewInterview(true)}>New Interview</Button>
              <Button variant='text' onClick={() => props.onSetViewProfile(true)}>View Profile</Button>
            </>
          ) : (
            <>
              <Button variant='text' onClick={() => props.onSetNewResult(true)}>New Result</Button>
              <Button variant='text' onClick={() => props.onSetNewInterview(true)}>New Interview</Button>
            </>
          )}
        </div>
      )}
    </Toolbar>
  );
}

type ApplicantTableProps = {
  currentJobId: number
  setShowApplicantTable: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ApplicantTable(props: ApplicantTableProps) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('appliedTimestamp');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [rowsProfile, setRowsProfile] = React.useState<Map<number, ProfileResponse>>(new Map<number, ProfileResponse>);
  const [showApplicantProfileDialog, setShowApplicantProfileDialog] = React.useState(false);
  const [showNewInterviewDialog, setShowNewInterviewDialog] = React.useState(false);
  const [showNewResultDialog, setShowNewResultDialog] = React.useState(false);
  
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    HTTPHelper.call<AppHistoryResponse>(
        `${appGlobal.endpoint_job}/getAllApplicationsByJob?jobId=${props.currentJobId}`,
        'GET'
    ).then((response) => {
      console.log(response);
      if (response.result) {
        const newRows = response.resultList.map(app => createData(
          app.id,
          app.applicant.profile.firstname + ' ' + app.applicant.profile.lastname,
          app.applicant.profile.alias,
          app.applicant.profile.idcard,
          app.applicant.profile.phoneNumber,
          Math.floor(new Date(app.appliedTime).getTime() / 1000),
          app.status.name,
          app.interviewLocation,
          Math.floor(new Date(app.interviewTime).getTime() / 1000)
        ));
        setRows([...newRows]);

        const profMap = new Map<number, ProfileResponse>();

        response.resultList.forEach(app => {
          profMap.set(app.id, app.applicant.profile);
        });
        setRowsProfile(profMap);
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
      alert("Failed to retrieve applications.");
    });
  }

  // Debug
  React.useEffect(() => {
    console.log("Updated rowsProfile:", rowsProfile);
  }, [rowsProfile]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Showing dialogs */}
      {showApplicantProfileDialog && 
        <AdminManageViewProfileDialog 
          toggleSetter={setShowApplicantProfileDialog} 
          toggle={showApplicantProfileDialog} 
          applicantProfile={rowsProfile.get(selected[0])}/>}

      {showNewInterviewDialog && 
        <AdminManageNewInterviewDialog 
          toggleSetter={setShowNewInterviewDialog} 
          toggle={showNewInterviewDialog}
          jobApplicationIds={selected}
          dataRefresher={fetchData}/>}

      {showNewResultDialog && 
        <AdminManageNewResultDialog 
          toggleSetter={setShowNewResultDialog} 
          toggle={showNewResultDialog}
          jobApplicationIds={selected}
          dataRefresher={fetchData}/>}

      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} 
          onSetNewResult={setShowNewResultDialog} 
          onSetNewInterview={setShowNewInterviewDialog} 
          onSetViewProfile={setShowApplicantProfileDialog}
          setShowApplicantTable={props.setShowApplicantTable}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.fullname}
                    </TableCell>
                    <TableCell align="left">{row.alias}</TableCell>
                    <TableCell align="left">{row.idcard}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{TimeHelper.convertToHKTime(new Date(row.appliedTimestamp*1000).toISOString())}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.interviewLocation}</TableCell>
                    <TableCell align="left">{row.interviewTimestamp? TimeHelper.convertToHKTime(new Date(row.interviewTimestamp*1000).toISOString()) : ""}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
