const express = require("express")
const router = express.Router()
const userRoute = require("./user")
const orderRoute = require("./order")
const testRoute = require("./test")
const authRoute = require("./auth")

router.use("/user",userRoute);
router.use("/order",orderRoute);
router.use("/",testRoute);
router.use("/auth",authRoute);

module.exports = router
