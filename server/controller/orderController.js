//orderController.js
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
async function getOrders(params) {
  try {
    orderCollection = db.getACollection(collectionName);
    const orderData = await orderCollection.find(params).toArray();
    return orderData;
  } catch (error) {
    console.log(error);
  }
}

/**
 * This function retrieves a order from the database
 *
 * @returns Array data array
 */
async function getOrder(params) {
  try {
    orderCollection = db.getACollection(collectionName);
    const orderData = await orderCollection.findOne(params);
    return orderData;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Function perform to create a document on a collection
 *
 * @param {Object} data object expected for update
 * @returns document ID
 */
async function createOrder(data) {
  const orderID = await db.createARecord(collectionName, data);
  return await getOrder({ _id: orderID });
}

/**
 * delete orders based on the data
 *
 * @param {Object} data object to filter data
 * @returns document ID
 */
async function deleteOrders(data) {
  return await db.deleteRecords(collectionName, data);
}

module.exports = {
  getOrders,
  createOrder,
  deleteOrders,
};
