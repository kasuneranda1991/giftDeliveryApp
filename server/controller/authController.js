//authController.js
const db = require("../database");

//collection name
const collectionName = "users";

/**
 * This function authenticate user based on the username awnd password
 *
 * @param {Object} credentials {email,password}
 * @returns {Object} user object or NULL
 */

async function authenticate(credentials) {
  try {
    const user = db.find(collectionName, credentials);
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  authenticate,
};
