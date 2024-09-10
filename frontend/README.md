NECYPAA Preregistration Frontend

This is the frontend of the NECYPAA Preregistration Competition App, built using React. It provides a form for users to preregister for the NECYPAA event and integrates PayPal for payment processing. The app is also a Progressive Web App (PWA), meaning it supports offline functionality and can be installed on mobile devices.

Features

Preregistration Form: Users can fill in their details (name, email, phone, etc.) and submit their preregistration.
PayPal Integration: Payment processing via PayPal.
PWA Support: Offline access and installation on mobile devices.
Responsive Design: Optimized for both mobile and desktop devices.
Technologies

React for building the user interface.
PayPal API for payment integration.
Service Workers for PWA offline functionality.
Material-UI for styling the components.
Setup and Installation

Prerequisites Make sure you have the following installed:

Node.js: Download from https://nodejs.org.
Steps to Set Up

Navigate to the frontend directory:

bash
Copy code
cd frontend
Install dependencies:

Copy code
npm install
Start the development server:

sql
Copy code
npm start
This will run the app locally on http://localhost:3000.

Build for production: If you want to create an optimized production build:

arduino
Copy code
npm run build
Serve the production build: To test the production build locally:

Copy code
npm install -g serve
serve -s build
PWA Setup:

The app supports Progressive Web App functionality.
After running the production build, open the app on a mobile device to see the "Add to Home Screen" option.
PWA Features

The app supports offline usage via service workers.
Users can install the app on their devices and use it like a native mobile app.
Environment Variables

To enable PayPal payments, you need to set your PayPal client ID in an environment variable:

makefile
Copy code
REACT_APP_PAYPAL_CLIENT_ID=your-client-id
Folder Structure

src/: The main source code for the frontend, including components and service worker.
public/: Static files like icons, index.html, and the PWA manifest.
Deployment

Build the production files using npm run build.
Deploy the contents of the build/ folder to your preferred hosting provider (e.g., Netlify, AWS, or GitHub Pages).
License

This project is licensed under the GNU License.
