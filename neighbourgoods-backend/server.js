// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;

// require('dotenv').config();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Sample route
// app.get('/', (req, res) => {
//   res.send('Welcome to NeighbourGoods Backend!');
// });

// app.post('/verifyToken', (req, res) => {
//   const idToken = req.body.idToken;

//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       const uid = decodedToken.uid;
//       // Proceed with your application logic
//       res.status(200).send({ uid });
//     })
//     .catch((error) => {
//       res.status(401).send('Unauthorized');
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

// dotenv.config();

const app = express();

// const admin = require('firebase-admin');

// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


// // Parse the service account JSON file
// const serviceAccount = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

// // Initialize the app with a service account, granting admin privileges
// initializeApp({
//   credential: applicationDefault(),
//   // Alternatively, use:
//   // credential: cert(serviceAccount),
// });

// // Now you can use other services, e.g., Authentication
// const auth = getAuth();

// Connect to MongoDB
// connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to NeighbourGoods Backend!');
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/verifyToken', (req, res) => {
  const idToken = req.body.idToken;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // Proceed with your application logic
      res.status(200).send({ uid });
    })
    .catch((error) => {
      res.status(401).send('Unauthorized');
    });
});
