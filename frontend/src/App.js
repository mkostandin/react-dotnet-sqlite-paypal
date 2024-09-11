import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { TextField, Checkbox, Typography, FormControlLabel, Button } from "@mui/material";
import './App.css'; // Make sure this imports your updated CSS

function App() {
  const [formData, setFormData] = useState({
    name: "",
    cityStateCommittee: "",
    phone: "",
    email: "",
    sobrietyDate: "",
    accessibilityNeeds: "",
    serviceOptions: {
      panelSpeaker: false,
      volunteer: false,
      noThankYou: false,
    },
    amount: "20.00",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      serviceOptions: {
        ...formData.serviceOptions,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.cityStateCommittee.trim()) formErrors.cityStateCommittee = "City/State/Committee is required";
    if (!formData.phone.trim()) formErrors.phone = "Phone number is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Valid email is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, process PayPal transaction");
    } else {
      console.log("Form has errors, do not proceed");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div className="App">
        {/* Title and Description */}
        <Typography variant="h5" align="center" gutterBottom>
          Help Us Bring NECYPAA to the Granite State!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Preregister now for NECYPAA, happening in Vermont from January 3rd to 5th, 2025! By preregistering through the NH Bid, you'll help us compete to win better seats for the 2025 conference and bring NECYPAA to New Hampshire in 2026. Your support makes a difference—join our bid and be part of something bigger!
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name (first and last)*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            label="City/State/Committee*"
            name="cityStateCommittee"
            value={formData.cityStateCommittee}
            onChange={handleChange}
            fullWidth
            error={!!errors.cityStateCommittee}
            helperText={errors.cityStateCommittee}
            margin="normal"
          />
          <TextField
            label="Phone Number*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
            margin="normal"
          />
          <TextField
            label="Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            label="Sobriety Date"
            name="sobrietyDate"
            value={formData.sobrietyDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Any accessibility needs?"
            name="accessibilityNeeds"
            value={formData.accessibilityNeeds}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="panelSpeaker"
                checked={formData.serviceOptions.panelSpeaker}
                onChange={handleCheckboxChange}
              />
            }
            label="Panel Speaker"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="volunteer"
                checked={formData.serviceOptions.volunteer}
                onChange={handleCheckboxChange}
              />
            }
            label="Volunteer"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="noThankYou"
                checked={formData.serviceOptions.noThankYou}
                onChange={handleCheckboxChange}
              />
            }
            label="No thank you"
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>

        {/* PayPal Button */}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: formData.amount, // Amount to charge
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
