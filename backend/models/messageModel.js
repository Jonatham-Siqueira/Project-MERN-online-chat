const mongoose = require("mongoose");

// Define the schema for the Message model
const messageSchema = mongoose.Schema(
  {
    // Reference to the sender of the message
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // The content of the message, as a string
    content: { type: String, trim: true },

    // Reference to the chat to which this message belongs
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // An array of user IDs indicating who has read the message
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create a Message model based on the defined schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
