const Cart = require("../models/cart");

const addCartItem = async (req, res) => {
  const { quantity, weight, productType, price } = req.body;

  let totalPrice = price;

  if (quantity && weight) {
    if (weight === "1" || weight === "2" || weight === "3") {
      const weightInGram = weight * 1000;
      totalPrice = quantity * ((weightInGram / 250) * price);
    } else {
      totalPrice = quantity * ((weight / 250) * price);
    }
  }
  try {
    const user = await Cart.findOne({ userId: req.user._id });

    if (!user) {
      const response = await Cart.create({
        userId: req.user._id,
        cartItems: {
          productId: req.params.id,
          quantity,
          weight,
          productType,
          totalPrice,
        },
      });
    } else {
      const response = await Cart.updateMany(
        {
          userId: req.user._id,
        },
        {
          $push: {
            cartItems: {
              productId: req.params.id,
              quantity,
              weight,
              productType,
              totalPrice,
            },
          },
        }
      );
    }

    return res.json({ massage: "Item added to the cart" });
  } catch (error) {
    return res.json({ massage: error });
  }
};

const getCartItem = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id })
      .populate({
        path: "cartItems",
        populate: {
          path: "productId",
          model: "product",
        },
      })
      .exec();

    if (!cartItems[0]?.cartItems[0]) {
      return res.json({ massage: "there is no items in your cart" });
    }
    return res.send(cartItems[0]?.cartItems);
  } catch (error) {
    return res.json({ massage: error });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const response = await Cart.updateMany(
      {
        userId: req.user._id,
      },
      {
        $pull: {
          cartItems: {
            _id: req.params.id,
          },
        },
      }
    );
    return res.json({ massage: "removed" });
  } catch (error) {
    return res.json({ massage: error });
  }
};

module.exports = { addCartItem, getCartItem, deleteCartItem };
