// import 
const express = require("express");
const cors = require("cors")

require('dotenv').config()

const PORT =process.env.PORT || 5000;

const connectMongoDB = require("./connection");

const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user");
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const paymentRouter = require("./routes/payment")

const {restrictToLogedInUserOnly} = require ("./middlewares/auth")

// initialize the express function to the app
const app = express();

// connect mongodb
connectMongoDB(process.env.MONGO_ATLAS_URI);

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:'https://cakeat-ecom.vercel.app',
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders:'Content-Type',
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());

app.use('/public', express.static('public'));

// routes
app.use("/api",userRouter);
app.use("/api/product",productRouter)
app.use("/api/cart",restrictToLogedInUserOnly,cartRouter)
app.use("/api/payment/",restrictToLogedInUserOnly,paymentRouter)

app.get("/api/getkey",(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
})

app.listen(PORT,()=>{
    console.log(`my server starts at port ${PORT}`)
});