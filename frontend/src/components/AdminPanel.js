import React, { useState, useEffect } from "react";
import RegistrationList from './RegistrationList';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch registrations from backend API
    const fetchRegistrations = async () => {
      const response = await fetch("/api/registrations");
      const data = await response.json();
      setRegistrations(data);
    };

    fetchRegistrations();
  }, []);

  // Define the sendByEmail function here
  const sendByEmail = (registration) => {
    console.log(`Sending registration details for ${registration.name}`);
    // You would add your email sending logic here, maybe call an API to send an email
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="stats">
        <p>Total Registrations: {registrations.length}</p>
      </div>
      <RegistrationList registrations={registrations} />
    </div>
  );
}

export default AdminPanel;