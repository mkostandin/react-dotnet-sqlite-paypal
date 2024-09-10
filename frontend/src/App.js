import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RegistrationForm from './components/RegistrationForm';
import PayPalButton from './components/PayPalButton'; // Ensure this is correct
import './App.css';
import { Typography } from "@mui/material";

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Form Data: ", formData);
    // Proceed with PayPal transaction or other logic
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div className="App">
        {/* Header Section */}
        <Typography variant="h5" align="center" gutterBottom>
          Help Us Bring NECYPAA to the Granite State!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Preregister now for NECYPAA, happening in Vermont from January 3rd to 5th, 2025! 
          By preregistering through the NH Bid, you'll get a $5 discount and help us compete to bring NECYPAA to New Hampshire in 2026.
        </Typography>

        {/* Registration Form */}
        <RegistrationForm onSubmit={handleFormSubmit} />
        
        {/* PayPal Button */}
        {/* Ensure the PayPalButton component is correctly handling PayPal logic */}
        <PayPalButton amount="20.00" />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;