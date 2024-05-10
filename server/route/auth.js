//route user.js
const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const response = require("../utils/response");

router.post("/", async (req, res) => {
console.log(req.body);
  const user = await authController.authenticate(req.body);
  if (user) {
    res
      .status(200)
      .json(response.success({ message: "Authenticated", payload: user }));
  } else {
    res
      .status(401)
      .json(
        response.error({ message: "Authentication failed", payload: null })
      );
  }
});

module.exports = router;
