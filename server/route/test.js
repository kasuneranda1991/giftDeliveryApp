//route test.js
const express = require("express");
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const router = express.Router()

router.get("/getUserDataTest",async (req,res)=>{
    const userData = await userController.getUserData();
    res.json(userData);
})

router.get("/getOrderDataTest",async (req,res)=>{
    const orderData = await orderController.getOrders();
    res.json(orderData);
})

module.exports = router