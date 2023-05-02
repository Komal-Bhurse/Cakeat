// import 
const express = require("express");
const PORT = 5000;

const connectMongoDB = require("./connection");
const cors = require("./middlewares/index");

const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user");
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const paymentRouter = require("./routes/payment")

const MONGO_ATLAS_URI = require("./config/keys")
const RAZORPAY_KEY_ID = require("./config/keys")

const {restrictToLogedInUserOnly} = require ("./middlewares/auth")

// initialize the express function to the app
const app = express();

// connect mongodb
connectMongoDB(MONGO_ATLAS_URI);

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());


 
app.use('/public', express.static('public'));


// routes
app.use("/api",userRouter);
app.use("/api/product",productRouter)
app.use("/api/cart",restrictToLogedInUserOnly,cartRouter)
app.use("/api/payment/",restrictToLogedInUserOnly,paymentRouter)

app.get("/api/getkey",(req,res)=>{
    res.status(200).json({key:RAZORPAY_KEY_ID})
})

if(process.env.NODE_ENV=='production'){
    const path = require("path");

    app.get("/",(req,res)=>{
        app.use(express.static(path.join(__dirname,"../client/build")))
        res.sendFile(path.join(__dirname,"../client/build/index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`my server starts at port ${PORT}`)
});