const express = require("express")
const {handleOrders,handleVerify} = require("../controllers/payment")

const router = express.Router()

router.post("/orders",handleOrders);

router.post("/verify",handleVerify);

module.exports = router;