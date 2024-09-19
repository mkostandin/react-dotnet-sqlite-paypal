// src/components/PayPalButton.js
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Box } from '@mui/material';

const PayPalButton = ({ amount }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        width: '100%',
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource={undefined} /* This allows all funding sources like Venmo to be enabled */
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // Amount to charge
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
        funding={{
          disallowed: [window?.paypal?.FUNDING?.PAYLATER], // Safely disallow Pay Later
        }}
      />
    </Box>
  );
};

export default PayPalButton;