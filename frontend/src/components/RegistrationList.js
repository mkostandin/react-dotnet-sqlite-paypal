import React, { useState } from "react";

function RegistrationList({ registrations, sendByEmail }) {
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting logic
  const sortedRegistrations = [...registrations].sort((a, b) => {
    if (sortConfig !== null) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic
  const filteredRegistrations = sortedRegistrations.filter((reg) =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      {/* Search input field for filtering */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("name")}>Name</th>
            <th onClick={() => requestSort("email")}>Email</th>
            <th onClick={() => requestSort("transactionId")}>Transaction ID</th>
            <th onClick={() => requestSort("dateRegistered")}>Date Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.name}</td>
              <td>{reg.email}</td>
              <td>{reg.transactionId}</td>
              <td>{new Date(reg.dateRegistered).toLocaleDateString()}</td>
              <td>
                <button onClick={() => sendByEmail(reg)}>Send by Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationList;