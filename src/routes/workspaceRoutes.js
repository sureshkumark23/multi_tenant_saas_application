const express = require("express");
const { createWorkspace, inviteUser } = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router(); // ✅ THIS WAS MISSING

// create workspace
router.post("/", authMiddleware, createWorkspace);

// invite user to workspace (admin/owner only)
router.post(
  "/:workspaceId/invite",
  authMiddleware,
  roleMiddleware("admin"),
  inviteUser
);

module.exports = router;
