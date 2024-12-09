// Import MongoDB configuration
require("./config/db"); // MongoDB setup (make sure it's properly configured in db.js)

// Import Firebase Admin SDK
const admin = require("firebase-admin"); // Firebase Admin SDK for Realtime Database

// Initialize Firebase Admin SDK with application default credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://rfid-bus-ticketing-3c860-default-rtdb.asia-southeast1.firebasedatabase.app",  // Replace with your Firebase Realtime Database URL
});

// Reference Firebase Realtime Database
const database = admin.database();

const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes");

app.use(express.json()); // To parse JSON data

// Use MongoDB-related routes
app.use("/", userRoute);  // Import the user routes for handling login, registration, etc.

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
