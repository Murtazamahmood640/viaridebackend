const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config();

// Connect to the database (assumed to be in ./conn/conn)
require('./conn/conn');

// CORS configuration to allow specific origins (local and production frontend)
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://viaridefrontend.vercel.app' // Production deployed frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and other credentials
};

// Use CORS middleware
app.use(cors(corsOptions));

// Importing route modules
const auth = require("./routes/UserManagment/auth");
const userPassenger = require('./routes/UserManagment/userPassenger');
const dispatcher = require('./routes/UserManagment/dispatacher');
const accountant = require('./routes/UserManagment/accountant');
const vehicle = require('./routes/VehicleManagment/Vehicle');
const allDriver = require('./routes/Driver/allDrivers');
const driverRequest = require('./routes/Driver/driverRequest');
const trips = require('./routes/Trips/trips');
const userDriver = require('./routes/UserManagment/userDriver');

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send("Hello");
});

// Define API routes
app.use("/api/viaRide", auth);
app.use("/api/ViaRide", userPassenger);
app.use("/api/ViaRide", userDriver);
app.use("/api/viaRide", dispatcher);
app.use("/api/viaRide", accountant);
app.use("/api/viaRide", vehicle);
app.use("/api/viaRide", allDriver);
app.use("/api/viaRide", driverRequest);
app.use("/api/viaRide", trips);

// Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
