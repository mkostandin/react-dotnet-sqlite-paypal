// src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Snackbar, Alert, Stack } from '@mui/material';
import AdminToolbar from './AdminToolbar';
import AdminStats from './AdminStats';
import AdminFilter from './AdminFilter';
import RegistrationList from './RegistrationList';

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch registrations from backend API
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("http://localhost:5192/api/registrations");
        console.log("Fetch response status:", response.status);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched registrations:", data);
        setRegistrations(data);
        setFilteredRegistrations(data); // Initially set filtered to all data
      } catch (error) {
        console.error("Failed to fetch registrations: ", error);
        setError(error.message || "Failed to fetch registrations.");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  useEffect(() => {
    // Filter registrations by name or email
    const filtered = registrations.filter((reg) =>
      reg.name.toLowerCase().includes(filterText.toLowerCase()) ||
      reg.email.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredRegistrations(filtered);
  }, [filterText, registrations]);

  const sendByEmail = (registration) => {
    console.log(`Sending registration details for ${registration.name}`);
    // Add your email sending logic here
    alert(`Sending email to ${registration.email}`);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        {/* Stack for vertical layout with spacing */}
        <Stack spacing={4}>
          {/* Admin Toolbar */}
          <AdminToolbar />

          {/* Admin Stats */}
          <AdminStats total={filteredRegistrations.length} />

          {/* Admin Filter */}
          <AdminFilter filterText={filterText} setFilterText={setFilterText} />

          {/* Registration List */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            <RegistrationList registrations={filteredRegistrations} sendByEmail={sendByEmail} />
          )}
        </Stack>

        {/* Error Snackbar */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AdminPanel;