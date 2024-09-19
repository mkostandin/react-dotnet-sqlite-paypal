// src/components/RegistrationList.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery,
  Typography,
  TablePagination,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const RegistrationList = ({ registrations, sendByEmail }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define the maximum number of rows
  const MAX_ROWS = 10;

  // Pagination State
  const [page, setPage] = useState(0);
  const rowsPerPage = MAX_ROWS; // Always show MAX_ROWS per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the slice of registrations to display based on the current page
  const registrationsToDisplay = registrations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Determine how many empty rows are needed to reach MAX_ROWS
  const emptyRows = Math.max(0, MAX_ROWS - registrationsToDisplay.length);

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table aria-label="registrations table" size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              {!isMobile && <TableCell><strong>Transaction ID</strong></TableCell>}
              <TableCell><strong>Date Registered</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render registration rows */}
            {registrationsToDisplay.length > 0 ? (
              registrationsToDisplay.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.email}</TableCell>
                  {!isMobile && (
                    <TableCell>{reg.transactionId ? reg.transactionId : 'N/A'}</TableCell>
                  )}
                  <TableCell>
                    {new Date(reg.dateRegistered).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size={isMobile ? 'small' : 'medium'}
                      onClick={() => sendByEmail(reg)}
                    >
                      Send Email
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // If no registrations, display a message in the first empty row
              <TableRow>
                <TableCell colSpan={isMobile ? 4 : 5} align="center">
                  No registrations available
                </TableCell>
              </TableRow>
            )}

            {/* Render empty rows to reach MAX_ROWS */}
            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow key={`empty-row-${index}`} sx={{ height: isMobile ? 33 : 53 }}>
                  <TableCell colSpan={isMobile ? 4 : 5} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {registrations.length > MAX_ROWS && (
        <TablePagination
          component="div"
          count={registrations.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[MAX_ROWS]} // Prevent changing rows per page
          sx={{
            '& .MuiTablePagination-toolbar': {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
};

export default RegistrationList;