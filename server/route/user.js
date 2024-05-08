//route user.js
const express = require("express");
const dummy = require("../Dummy");
const userController = require("../controller/userController");
const router = express.Router();

router
  .get("/", async (req, res) => {
    const userData = await userController.getUserData();
    res.json(userData);
  })
  .post("/", async (req, res) => {
    res.json(req.body);
  })
  .get("/dummy", async (req, res) => {
    const userId = await userController.createUser(dummy.user());
    res.json(userId);
  });

module.exports = router;
