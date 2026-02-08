const Project = require("../models/project");
const Workspace = require("../models/workspace");

/**
 * CREATE PROJECT INSIDE WORKSPACE
 */
const createProject = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // user must be workspace member
    if (!workspace.members.includes(req.user.userId)) {
      return res.status(403).json({ message: "Not a workspace member" });
    }

    const project = await Project.create({
      name,
      description,
      workspace: workspaceId,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject };
