const mongoose = require("mongoose");  // Import the mongoose library
const colors = require("colors");      // Import the colors library for console output formatting

/**
 * Asynchronous function to connect to a MongoDB database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,             // Use the new URL parser
      useUnifiedTopology: true,         // Use the new Server Discovery and Monitoring engine
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);  // Log a success message
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);  // Log an error message
    process.exit(1); // Exit the Node.js process with a non-zero status code to indicate an error
  }
};

module.exports = connectDB;  // Export the connectDB function for use in other parts of the application.
