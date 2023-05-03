
const Product = require("../models/product")
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null,path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
       return cb(null, fileName);
    }
  })
  
  const upload = multer({storage})

 const addProduct = async(req,res) =>{
      const {Name,Price,Description} = req.body;
      const product = await Product.create({
          Name,
          Price,
          Description,
          Image:`/public/uploads/${req.file.filename}`
      })
    
     return res.status(200).json({massage:"success"})
 }

 const getProduct = async(req,res) =>{
  try {
       const allProduct = await Product.find({})
      
       return res.send(allProduct);
  } catch (error) {
     return res.send(error);
  }
       
 }

 const getSingalProduct = async (req,res)=>{
     const product = await Product.findOne({_id:req.params.id});
     return res.send(product);
 }

 module.exports = {
    addProduct,
    getProduct,
    getSingalProduct,
    upload,
 }