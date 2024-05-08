const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mongoUser:tedEvbYHg2bCBt3h@giftdelivery.d1jrpjf.mongodb.net/?retryWrites=true&w=majority&appName=giftdelivery";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  console.log("Database up!\n");
});

/**
 * Retrieve a collection from the database
 * @param {String} collectionName 
 * @returns Mongodb Collection Object
 */
function getACollection(collectionName) {
  return client.db("giftDeliveryDB").collection(collectionName);
}

/**
 * Create a Database Record
 * @param {String} collectionName 
 * @param {JSON} data 
 * @returns inserted recordId
 */
async function createARecord(collectionName, data) {
    try {
      const collection = getACollection(collectionName);
      const result = await collection.insertOne(data);
      return result.insertedId;
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }

module.exports = {
  client,
  getACollection,
  createARecord
};
