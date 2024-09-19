// src/components/PayPalButton.js
import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Box } from '@mui/material';

const PayPalButtonComponent = ({ amount, onSuccess, onError }) => {
  // Access the PayPal script options
  const [{ options, isPending }] = usePayPalScriptReducer();

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
      {isPending ? (
        <div>Loading PayPal Buttons...</div>
      ) : (
        <PayPalButtons
          fundingSource="paypal" // Ensure PayPal is included
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // The amount for preregistration
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const order = await actions.order.capture();
              console.log('PayPal transaction completed:', order);
              onSuccess(order);
            } catch (error) {
              console.error('PayPal transaction failed:', error);
              onError(error);
            }
          }}
          onError={(err) => {
            console.error('PayPal script error:', err);
            onError(err);
          }}
        />
      )}
    </Box>
  );
};

export default PayPalButtonComponent;