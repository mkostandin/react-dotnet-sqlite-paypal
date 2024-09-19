// src/components/AdminStats.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const AdminStats = ({ total }) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">
        Total Registrations: {total}
      </Typography>
    </Box>
  );
};

export default AdminStats;