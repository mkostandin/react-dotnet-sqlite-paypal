import React from 'react';

const RegistrationList = ({ registrations }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Transaction ID</th>
          <th>Date Registered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {registrations.length > 0 ? (
          registrations.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.name}</td>
              <td>{reg.email}</td>
              <td>{reg.transactionId || 'N/A'}</td> {/* Show Transaction ID */}
              <td>{new Date(reg.dateRegistered).toLocaleDateString()}</td>
              <td>
                <button onClick={() => alert(`Sending email for ${reg.name}`)}>Send by Email</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No registrations available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RegistrationList;