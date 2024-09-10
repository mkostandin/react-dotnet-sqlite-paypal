import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import styles from './PayPalButton.module.css'; // Import CSS Module

const PayPalButton = ({ amount }) => {
  return (
    <div className={styles.paypalButtonContainer}>
      <PayPalButtons
        style={{ layout: "vertical" }}
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
      />
    </div>
  );
};

export default PayPalButton;