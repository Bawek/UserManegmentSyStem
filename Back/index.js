import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

import userRouter from "./Route/userRoute.js";
import noteRouter from "./Route/noteRoute.js";
import mongodb from "./config/mongodb.js";

const app = express(); // Initialize the Express application
const port = process.env.PORT || 5000;
mongodb()
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Default route
app.get("/", (req, res) => {
    res.send("Please wait...");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

// Error handling middleware (500 Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Handle 404 errors (Route not found)
app.use((req, res) => {
    res.status(404).json({ message: "Route not found!" });
});

// Start the server
app.listen(port, () => {
    console.log(`The app is running on http://localhost:${port}`);
});
