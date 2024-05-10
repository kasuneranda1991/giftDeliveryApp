//route user.js
const express = require("express");
const dummy = require("../Dummy");
const userController = require("../controller/userController");
const router = express.Router();
const response = require("../utils/response");

router
  .get("/", async (req, res) => {
    const userData = await userController.getUserData();
    res.json(userData);
  })
  .post("/", async (req, res) => {
    try {
      var userId = await userController.createUser(req.body);
      res.status(200).json(
        response.success({
          message: "Registration Success",
          payload: { id: userId },
        })
      );
    } catch (error) {
      res
        .status(500)
        .json(
          response.error({ message: "Registration failed", payload: error })
        );
    }
  })
  .post("/auth", async (req, res) => {
    try {
      var userId = await userController.createUser(req.body);
      res.status(200).json(
        response.success({
          message: "Registration Success",
          payload: { id: userId },
        })
      );
    } catch (error) {
      res
        .status(500)
        .json(
          response.error({ message: "Registration failed", payload: error })
        );
    }
  })
  .get("/dummy", async (req, res) => {
    const userId = await userController.createUser(dummy.user());
    res.json(userId);
  });

module.exports = router;
