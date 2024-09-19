// src/components/AdminToolbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AdminToolbar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the main registration page
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ marginRight: 2 }}
        >
          Back
        </Button>
        <Typography variant="h6" component="div">
          Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminToolbar;