const express = require("express");
const { createTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// create task inside project
router.post(
  "/projects/:projectId/tasks",
  authMiddleware,
  createTask
);

module.exports = router;
