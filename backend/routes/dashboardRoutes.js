const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ================= DASHBOARD STATS =================
router.get("/stats", authMiddleware, async (req, res) => {

    try {

        const totalProjects = await Project.countDocuments();
        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({
            status: "Completed"
        });

        const pendingTasks = await Task.countDocuments({
            status: "Pending"
        });

        res.json({
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks
        });

    } catch (error) {
        console.log("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }

});

module.exports = router;