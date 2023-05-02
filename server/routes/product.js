const express = require("express");

const {addProduct,getProduct,getSingalProduct,upload} = require("../controllers/product")

const router = express.Router();

router.post("/",upload.single('image'),addProduct);

router.get("/cake",getProduct)

router.get("/:id",getSingalProduct)

module.exports = router ;