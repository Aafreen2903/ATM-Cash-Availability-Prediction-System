const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "ATM Cash Prediction API is running!"
    });
});
// Protected test route
app.get("/api/auth/protected", protect, (req, res) => {
    res.json({
        message: "You have access to this protected route!",
        user: req.user
    });
});