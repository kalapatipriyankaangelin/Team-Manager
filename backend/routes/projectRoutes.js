const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE PROJECT
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const { title, description, teamMembers } = req.body;

        const project = new Project({
            title,
            description,
            teamMembers,
            createdBy: req.user.id
        });

        await project.save();

        res.status(201).json({
            message: "Project Created Successfully",
            project
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// GET PROJECTS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await Project.find()
        .populate("createdBy", "name email")
        .populate("teamMembers", "name email");

        res.status(200).json(projects);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;