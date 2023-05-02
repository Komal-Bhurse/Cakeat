const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    products: [
      {
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
          default: "250g"
      },
      productType:{
          type: String,
          default: "EggLess"
      }
      },
    ],
    amount: {
         type: Number
    },
    address: {
         type: String,
         required: true
    },
    status: 
    { 
      type: String,
      trim:true,
      enum:{
        values:["Pending","Complete","Cancelled"]
      },
      default:"Pending",
    
    },
},{timestamps:true})

const Order = mongoose.model("order",orderSchema);

module.exports = Order;