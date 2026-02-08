const express = require("express");
const { createProject } = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// create project inside workspace
router.post(
  "/:workspaceId/projects",
  authMiddleware,
  createProject
);

module.exports = router;
