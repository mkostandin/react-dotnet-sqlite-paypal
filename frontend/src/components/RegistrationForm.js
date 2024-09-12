import React, { useState } from "react";
import { TextField, Checkbox, Typography, FormControlLabel, Button } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPal Buttons
import styles from './RegistrationForm.module.css'; // Import the CSS module

const RegistrationForm = ({ onSubmit }) => {
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
  });

  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track PayPal payment success

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
      onSubmit(formData); // Call the passed-in onSubmit function with form data
    }
  };

  const handlePayPalSuccess = async (order) => {
    console.log("PayPal transaction completed:", order);
    setPaymentSuccess(true);
    const finalFormData = {
      ...formData,
      transactionId: order.id, // Attach PayPal transaction ID
    };
    onSubmit(finalFormData); // Submit the form data including PayPal transaction ID
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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

      <Typography variant="h6" gutterBottom className={styles.checkboxLabel}>
        Would you like to be of service?
      </Typography>
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

      <Button
        className={styles.submitButton}
        variant="contained"
        color="primary"
        type="submit"
        fullWidth={false} // Make sure fullWidth is false to respect CSS width
        disabled={!paymentSuccess} // Disable until PayPal payment is successful
      >
        Submit
      </Button>

      {/* PayPal Buttons */}
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: "20.00" }, // The amount for preregistration
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          handlePayPalSuccess(order); // Trigger on successful payment
        }}
        onError={(err) => console.error("PayPal transaction failed: ", err)}
      />
    </form>
  );
};

export default RegistrationForm;