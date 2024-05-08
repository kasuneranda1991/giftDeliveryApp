//route user.js
const express = require("express");
const dummy = require("../Dummy");
const orderController = require("../controller/orderController");
const router = express.Router()

router.get("/",async (req,res)=>{
    const orderData = await orderController.getOrders();
    res.json(orderData);
})

router.post("/",async (req,res)=>{
    res.json(req.body);
})

router.get("/dummy",async (req,res)=>{
    const orderId = await orderController.createOrder(dummy.order());
    res.json(orderId);
})

module.exports = router