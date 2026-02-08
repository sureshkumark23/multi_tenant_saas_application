const Task = require("../models/task");
const Project = require("../models/project");
const Workspace = require("../models/workspace");

/**
 * CREATE TASK
 */
const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    // find project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // find workspace
    const workspace = await Workspace.findById(project.workspace);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // user must be workspace member
    if (!workspace.members.includes(req.user.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      project: projectId,
      assignedTo,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      taskId: task._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask };
