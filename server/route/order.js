//route user.js
const express = require("express");
const dummy = require("../Dummy");
const orderController = require("../controller/orderController");
const router = express.Router();
const response = require("../utils/response");

router
  .get("/", async (req, res) => {
    const orderData = await orderController.getOrders(req.query);
    res.json(orderData);
  })
  .post("/", async (req, res) => {
    try {
      var orderId = await orderController.createOrder(req.body);
      res.status(200).json(
        response.success({
          message: "Order placed",
          payload: { id: orderId },
        })
      );
    } catch (error) {
      res
        .status(500)
        .json(
          response.error({ message: "Order creation failed", payload: error })
        );
    }
  })
  .delete("/", async (req, res) => {
    try {
      var data = await orderController.deleteOrders(req.query);
      res.status(200).json(
        response.success({
          message: "Orders deleted",
          payload: data,
        })
      );
    } catch (error) {
      res
        .status(500)
        .json(
          response.error({ message: "Orders deletion failed", payload: error })
        );
    }
  });

router.get("/dummy", async (req, res) => {
  const orderId = await orderController.createOrder(dummy.order());
  res.json(orderId);
});

module.exports = router;
