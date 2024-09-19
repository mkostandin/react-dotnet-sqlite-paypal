import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel'; // Import AdminPanel component
import { Typography, Button } from "@mui/material";
import './App.css';

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Form Data: ", formData);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}>
      <Router>
        <div className="App">
          <Routes> {/* Replace Switch with Routes */}
            {/* Route for the registration form */}
            <Route path="/" element={
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  Help Bring NECYPAA to the Granite State!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                  Preregister now for NECYPAA for only $20, happening in Vermont from January 3rd to 5th, 2025! 
                  By preregistering through the NH Bid, you'll get a $5 discount and help us compete to bring NECYPAA to New Hampshire in 2026.
                </Typography>

                {/* Registration Form */}
                <RegistrationForm onSubmit={handleFormSubmit} />

                {/* Admin Panel Access Button */}
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Link to="/admin">
                    <Button variant="contained" color="secondary">
                      Admin Panel
                    </Button>
                  </Link>
                </div>
              </>
            } />

            {/* Route for the admin panel */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;