const db = require("../database");

//order collection
var orderCollection;

//collection name
const collectionName = "orders";

/**
 * This function retrieves all the orders from the database
 * 
 * @returns Array data array
 */
async function getOrders() {
  try {
    orderCollection = db.getACollection(collectionName);
    const orderData = await orderCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return orderData;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Function performe to create a document on a collection
 * 
 * @param {Object} data object expected for update 
 * @returns document ID
 */
async function createOrder(data) {
  return await db.createARecord(collectionName, data);
}

module.exports = {
  getOrders,
  createOrder,
};
