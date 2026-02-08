const Workspace = require("../models/workspace");
const User = require("../models/User");


/**
 * CREATE WORKSPACE
 */
const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Workspace name is required" });
    }

    const workspace = await Workspace.create({
      name,
      owner: req.user.userId,
      members: [req.user.userId],
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspaceId: workspace._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * INVITE USER TO WORKSPACE
 */
const inviteUser = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // only owner can invite
    if (workspace.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Only owner can invite users" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent duplicates
    if (workspace.members.includes(user._id)) {
      return res.status(400).json({ message: "User already a member" });
    }

    workspace.members.push(user._id);
    await workspace.save();

    res.status(200).json({ message: "User added to workspace" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createWorkspace, inviteUser };
