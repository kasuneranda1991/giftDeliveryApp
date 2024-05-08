const express = require("express");
var cors = require("cors");
const routes = require("./route");
const app = express();
const port = 3000;

// These lines will be explained in detail later in the unit
app.use(express.json()); // process json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Application routes
app.use("/",routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
