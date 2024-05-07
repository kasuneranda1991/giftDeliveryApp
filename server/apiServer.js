const express = require("express");
var cors = require("cors");
const { fakeUser } = require("./FakeData");
const app = express();
const port = 3000;

// These lines will be explained in detail later in the unit
app.use(express.json()); // process json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// These lines will be explained in detail later in the unit

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mongoUser:tedEvbYHg2bCBt3h@giftdelivery.d1jrpjf.mongodb.net/?retryWrites=true&w=majority&appName=giftdelivery";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Global for general use
var userCollection;
var orderCollection;
let result;
client.connect((err) => {
  userCollection = client.db("giftDeliveryDB").collection("users");
  orderCollection = client.db("giftDeliveryDB").collection("orders");

  async function run(){
	cursor = userCollection.find({},{projection:{_id:0}});
	await cursor.forEach(console.dir);
  }
  
  console.log(fakeUser());
  run().catch(console.dir);
  console.log("Database up!\n");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getUserDataTest", (req, res) => {
  userCollection
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, docs) {
      if (err) {
        console.log("Some error.. " + err + "\n");
      } else {
        console.log(JSON.stringify(docs) + " have been retrieved.\n");
        var str = "<h1>" + JSON.stringify(docs) + "</h1>";
        str += "<h1> Error: " + err + "</h1>";
        res.send(str);
      }
    });
});

app.get("/getOrderDataTest", (req, res) => {
  orderCollection
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, docs) {
      if (err) {
        console.log("Some error.. " + err + "\n");
      } else {
        console.log(JSON.stringify(docs) + " have been retrieved.\n");
        var str = "<h1>" + JSON.stringify(docs) + "</h1>";
        str += "<h1> Error: " + err + "</h1>";
        res.send(str);
      }
    });
});

app.post("/verifyUser", (req, res) => {
  loginData = req.body;

  console.log(loginData);

  userCollection
    .find(
      { email: loginData.email, password: loginData.password },
      { projection: { _id: 0 } }
    )
    .toArray(function (err, docs) {
      if (err) {
        console.log("Some error.. " + err + "\n");
      } else {
        console.log(JSON.stringify(docs) + " have been retrieved.\n");
        res.status(200).send(docs);
      }
    });
});

app.get("/getOrderData", (req, res) => {
  orderCollection
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, docs) {
      if (err) {
        console.log("Some error.. " + err + "\n");
      } else {
        console.log(JSON.stringify(docs) + " have been retrieved.\n");
        res.json(docs);
      }
    });
});

app.post("/postOrderData", function (req, res) {
  console.log("POST request received : " + JSON.stringify(req.body));

  orderCollection.insertOne(req.body, function (err, result) {
    if (err) {
      console.log("Some error.. " + err + "\n");
    } else {
      console.log(JSON.stringify(req.body) + " have been uploaded\n");
      res.send(JSON.stringify(req.body));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
