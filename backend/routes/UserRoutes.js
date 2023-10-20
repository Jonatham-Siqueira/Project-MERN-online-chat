const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers"); // Import user-related controller functions
const { protect } = require("../middleware/authMiddleware"); // Import user authentication middleware

// Create an Express router
const router = express.Router();

// Define routes and associated controllers
// Route: GET / - Fetch all users (protected route)
router.route("/").get(protect, allUsers);

// Route: POST / - Register a new user
router.route("/").post(registerUser);

// Route: POST /login - Authenticate user
router.post("/login", authUser);

// Export the router for use in the application
module.exports = router;
