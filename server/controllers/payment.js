const Razorpay = require("razorpay");
const crypto = require("crypto");

const RAZORPAY_KEY_ID = require("../config/keys");
const RAZORPAY_KEY_SECRET = require("../config/keys");

const handleOrders = async (req, res) => {
  const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
  const options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json({ massage: "order created", data: order });  
  } catch (error) {
    res.status(500).json({ massage:error});
  }
  
};

const handleVerify = (req, res) => {
  const body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.response.razorpay_signature) {
    return res.status(200).json({ massage: "veryfied" });
  } else {
    return res.status(500).json({ massage: "not veryfied" });
  }
};

module.exports = { handleOrders, handleVerify };
