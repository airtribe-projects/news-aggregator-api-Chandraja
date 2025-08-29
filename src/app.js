const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const preferencesRoutes = require("./routes/preferences");
const newsRoutes = require("./routes/news");




dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Auth routes
// app.use("/api/auth", authRoutes);
// app.use("/api/preferences", preferencesRoutes);
// app.use("/api/news", newsRoutes);
app.use('/users', authRoutes);          // for /users/signup and /users/login
app.use('/users/preferences', preferencesRoutes); // for /users/preferences
app.use('/news', newsRoutes);           // for /news

// Default 404 for unmatched routes
app.use((req, res) => res.status(404).json({ msg: 'Route not found' }));


module.exports = app;  // 
