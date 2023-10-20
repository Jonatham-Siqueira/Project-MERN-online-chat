const mongoose = require("mongoose");

// Define a schema for the Message model
const messageSchema = mongoose.Schema(
  {
    // Reference to the sender (User)
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Content of the message with trimming
    content: { type: String, trim: true },

    // Reference to the chat associated with the message (Chat)
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // An array of User references who have read the message
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // Enable automatic timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

// Create a Mongoose model for the Message schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
