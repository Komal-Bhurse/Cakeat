const express = require("express");
const {addCartItem, getCartItem, deleteCartItem} = require("../controllers/cart")

const router = express.Router();

router.post("/:id",addCartItem);

router.get("/",getCartItem)

router.delete("/:id",deleteCartItem)

module.exports = router;