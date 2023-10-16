const asyncHandler = require("express-async-handler"); // Import the 'express-async-handler' library to handle asynchronous routes
const Message = require("../models/messageModel"); // Import the 'Message' model
const User = require("../models/userModel"); // Import the 'User' model
const Chat = require("../models/chatModel"); // Import the 'Chat' model

// @description     Get all Messages
// @route           GET /api/Message/:chatId
// @access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }) // Retrieve all messages associated with a specific chat
      .populate("sender", "name pic email") // Populate the sender information with name, profile picture, and email
      .populate("chat"); // Populate the chat information
    res.json(messages); // Send the retrieved messages as a JSON response
  } catch (error) {
    res.status(400); // Respond with a 400 Bad Request status in case of an error
    throw new Error(error.message); // Throw an error with the provided error message
  }
});

// @description     Create a New Message
// @route           POST /api/Message/
// @access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body; // Extract content and chatId from the request body

  if (!content || !chatId) {
    console.log("Invalid data passed into the request");
    return res.sendStatus(400); // Send a 400 Bad Request status if the data passed is invalid
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage); // Create a new message using the provided data

    message = await message.populate("sender", "name pic").execPopulate(); // Populate sender information with name and profile picture
    message = await message.populate("chat").execPopulate(); // Populate chat information
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message }); // Update the latest message in the associated chat

    res.json(message); // Send the created message as a JSON response
  } catch (error) {
    res.status(400); // Respond with a 400 Bad Request status in case of an error
    throw new Error(error.message); // Throw an error with the provided error message
  }
});

module.exports = { allMessages, sendMessage }; // Export the route handlers
