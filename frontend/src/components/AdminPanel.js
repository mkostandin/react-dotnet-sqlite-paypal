import React, { useState, useEffect } from "react";
import RegistrationList from './RegistrationList';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Fetch registrations from backend API
    const fetchRegistrations = async () => {
        try {
          const response = await fetch("http://localhost:5192/api/registrations");
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
    
          const data = await response.json();
          setRegistrations(data);
          setFilteredRegistrations(data); // Initially set filtered to all data
        } catch (error) {
          console.error("Failed to fetch registrations: ", error);
        }
      };
    fetchRegistrations();
  }, []);

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);

    // Filter registrations by name or email
    const filtered = registrations.filter((reg) =>
      reg.name.toLowerCase().includes(searchText) || reg.email.toLowerCase().includes(searchText)
    );
    setFilteredRegistrations(filtered);
  };

  const sendByEmail = (registration) => {
    console.log(`Sending registration details for ${registration.name}`);
    // Add your email sending logic here
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="stats">
        <p>Total Registrations: {filteredRegistrations.length}</p>
      </div>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Filter by name or email..."
        value={filterText}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      <RegistrationList registrations={filteredRegistrations} sendByEmail={sendByEmail} />
    </div>
  );
}

export default AdminPanel;