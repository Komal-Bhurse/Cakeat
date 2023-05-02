const mongoose = require("mongoose");

const productSchema = new  mongoose.Schema({
       Name:{
        type: String,
        required: true, 
       },
       Price:{
         type: String,
         required: true,
       },
       Description:{
        type: String,
        required: true,
       },
       Image:{
        type: String,
        required: true,
       }
},{timestamps:true})

const Product = mongoose.model("product",productSchema);

module.exports = Product;