const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ CREATE TASK
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const { title, description, project, dueDate } = req.body;

        const task = new Task({
            title,
            description,
            project,
            dueDate
        });

        await task.save();

        res.status(201).json({
            message: "Task Created Successfully",
            task
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

});


// ✅ GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("project", "title")
            .populate("assignedTo", "name email");

        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

});


// ✅ UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            message: "Task Updated",
            updatedTask
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

});


module.exports = router;