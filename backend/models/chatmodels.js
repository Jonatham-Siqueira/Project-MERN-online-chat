const mongoose = require("mongoose");

// Define the schema for the Chat model
const chatSchema = mongoose.Schema(
  {
    // Name of the chat, if applicable
    chatName: { type: String, trim: true },

    // Indicates whether the chat is a group chat (default is false)
    isGroupChat: { type: Boolean, default: false },

    // An array of user IDs associated with this chat
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Reference to the latest message in this chat
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    // Reference to the user who is the group admin (if it's a group chat)
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create a Chat model based on the defined schema
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
