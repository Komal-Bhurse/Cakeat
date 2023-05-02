const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   cartItems:[{
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        default: 1
    },
    weight:{
        type: String,
        default: "250"
    },
    productType:{
        type: String,
        default: "EggLess"
    },
    totalPrice:{
        type: String
    }
   }]
},{timestamps:true})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;