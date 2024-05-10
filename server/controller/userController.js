// userController.js
const db = require("../database");

//user collection
var userCollection;

const collectionName = "users";

/**
 * Function returns all the user documents
 * 
 * @returns Array of user documents
 */
function getUserData() {
  try {
    userCollection = db.getACollection(collectionName);
    const userData = userCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return userData;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
}

/**
 * Create a user document in database
 * 
 * @param {Object} data object to create 
 * @returns 
 */
async function createUser(data) {
  return await db.createARecord(collectionName, data);
}

async function findUser(data) {
  return await db.find(collectionName,data);
}


module.exports = {
  getUserData,
  createUser,
  findUser
};
