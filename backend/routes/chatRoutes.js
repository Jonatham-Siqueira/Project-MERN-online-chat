const express = require("express");

// Import chat controller methods and authentication middleware
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

// Create a new Express router
const router = express.Router();

// Define routes and associate them with corresponding controller methods and the protect middleware
// Route for creating or fetching one-to-one chat (protected)
router.route("/").post(protect, accessChat);

// Route for fetching all chats for a user (protected)
router.route("/").get(protect, fetchChats);

// Route for creating a new group chat (protected)
router.route("/group").post(protect, createGroupChat);

// Route for renaming a group (protected)
router.route("/rename").put(protect, renameGroup);

// Route for removing a user from a group (protected)
router.route("/groupremove").put(protect, removeFromGroup);

// Route for adding a user to a group or letting a user leave a group (protected)
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
