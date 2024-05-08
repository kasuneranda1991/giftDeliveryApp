const express = require("express")
const router = express.Router()
const userRoute = require("./user")
const orderRoute = require("./order")
const testRoute = require("./test")

router.use("/user",userRoute);
router.use("/order",orderRoute);
router.use("/",testRoute);

module.exports = router
