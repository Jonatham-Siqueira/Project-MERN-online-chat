const asyncHandler = require("express-async-handler"); // Import the 'express-async-handler' library to handle asynchronous routes
const User = require("../models/userModel"); // Import the 'User' model
const generateToken = require("../config/generateToken"); // Import the 'generateToken' function from the configuration

// @description     Get or Search all users
// @route           GET /api/user?search=
// @access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } }, // Search by name with case-insensitive regular expression
          { email: { $regex: req.query.search, $options: "i" } }, // Search by email with case-insensitive regular expression
        ],
      }
    : {}; // If no search query is provided, return an empty object

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // Find and filter users based on the keyword and exclude the current user
  res.send(users); // Send the retrieved users as a response
});

// @description     Register a new user
// @route           POST /api/user/
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body; // Extract name, email, password, and pic from the request body

  if (!name || !email || !password) {
    res.status(400); // Respond with a 400 Bad Request status if required fields are missing
    throw new Error("Please Enter all the Fields"); // Throw an error message indicating missing fields
  }

  const userExists = await User.findOne({ email }); // Check if a user with the same email already exists

  if (userExists) {
    res.status(400); // Respond with a 400 Bad Request status if the user already exists
    throw new Error("User already exists"); // Throw an error message indicating that the user already exists
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  }); // Create a new user with the provided information

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    }); // Respond with a 201 Created status and return user details along with a generated token
  } else {
    res.status(400); // Respond with a 400 Bad Request status in case of an error
    throw new Error("User not found"); // Throw an error indicating that the user was not found
  }
});

// @description     Authenticate the user
// @route           POST /api/users/login
// @access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  const user = await User.findOne({ email }); // Find a user with the provided email

  if (user && (await user.matchPassword(password))) { // Check if a user with the provided email exists and if the provided password matches the user's password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    }); // Respond with the user's details and a generated token
  } else {
    res.status(401); // Respond with a 401 Unauthorized status if authentication fails
    throw new Error("Invalid Email or Password"); // Throw an error indicating invalid email or password
  }
});

module.exports = { allUsers, registerUser, authUser }; // Export the route handlers
