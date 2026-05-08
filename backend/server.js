const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 🚀"))
.catch((err) => console.log("MongoDB Error ❌", err));

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ================= TEST =================
app.get("/", (req, res) => {
    res.send("Team Task Manager Backend Running 🚀");
});

// ================= PROTECTED ROUTE =================
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

// ================= START SERVER =================
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
});