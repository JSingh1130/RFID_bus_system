// Import Firebase SDKs
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getDatabase } from "firebase/database"; // For Realtime Database

// Initialize Firebase App
const app = getApp();


const fs = require("fs");
const path = "./helloo-5352c-firebase-adminsdk-5j7dr-5eab877cc0.json";

if (!fs.existsSync(path)) {
  console.error(`Service account file not found at: ${path}`);
  process.exit(1); // Exit the application if the file is missing
}


// Initialize Firebase Functions
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Check if the app is running in the local environment (localhost)
if (window.location.hostname === "localhost") {
  // Client-side: Connect to the local Realtime Database emulator
  database.useEmulator("localhost", 9000); // Connect to Realtime Database emulator on port 9000
}

// Firebase Admin SDK (Server-side setup)
const admin = require("firebase-admin");
const serviceAccount = require("./helloo-5352c-firebase-adminsdk-5j7dr-5eab877cc0.json");

// Initialize Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
   databaseURL: "http://127.0.0.1:9001/?ns=helloo-5352c"
});

// Server-side: Use the Realtime Database Emulator in the local environment
if (process.env.NODE_ENV === "development") {
  admin.database().useEmulator("localhost", 9000); // Connect Admin SDK to the Realtime Database emulator on port 9000
}

// Export Firebase Admin SDK and other services for use in other files
module.exports = admin;
module.exports = admin.database();
