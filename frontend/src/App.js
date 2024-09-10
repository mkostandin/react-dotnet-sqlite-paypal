import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { TextField, Checkbox, Typography, FormControlLabel, Button } from "@mui/material";

function App() {
  // State for the form
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

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle changes for text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for checkboxes
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      serviceOptions: {
        ...formData.serviceOptions,
        [e.target.name]: e.target.checked,
      },
    });
  };

  // Form validation logic
  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.cityStateCommittee.trim()) formErrors.cityStateCommittee = "City/State/Committee is required";
    if (!formData.phone.trim()) formErrors.phone = "Phone number is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Valid email is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
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
        <Typography variant="h4" align="center" gutterBottom>
          NECYPAA Preregistration Competition
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Sign up to participate in the NECYPAA convention competition. Fill out the form below to preregister and support your committee!
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
              // Here you could send the formData to your backend
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
