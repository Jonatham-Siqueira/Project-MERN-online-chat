const jwt = require("jsonwebtoken");  // Import the 'jsonwebtoken' library

/**
 * Generates a JSON Web Token (JWT) for a user with the given 'id'.
 *
 * @param {string} id - The user's unique identifier to be included in the token payload.
 * @returns {string} A JWT containing the user's 'id' that is signed with a secret and has a 30-day expiration.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",  // Token expires in 30 days
  });
};

module.exports = generateToken;  // Export the 'generateToken' function for use in other parts of the application.
