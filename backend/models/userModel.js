const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    // User's name, a required field
    name: { type: String, required: true },

    // User's email, a unique and required field
    email: { type: String, unique: true, required: true },

    // User's password, a required field
    password: { type: String, required: true },

    // User's profile picture URL, with a default placeholder image
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    // User's role, whether they are an admin (default is false)
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Define a method to check if the entered password matches the user's stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Use a pre-save hook to hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create a User model based on the defined schema
const User = mongoose.model("User", userSchema);

module.exports = User;
