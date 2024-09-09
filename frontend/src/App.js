import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function App() {
  const [amount, setAmount] = useState("20.00");

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div className="App">
        <h1>Pay with PayPal or Venmo</h1>
        
        {/* Input field for amount */}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        {/* PayPal Button */}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // Ensure the amount is passed correctly
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