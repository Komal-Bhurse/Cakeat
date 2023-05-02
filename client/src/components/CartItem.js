import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllCartItems } from "../redux/slices/cartSlice";

function CartItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const removeCartItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        { withCredentials: true }
      );
      if (response?.data?.massage === "removed") {
        dispatch(getAllCartItems());
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {state.cart.data?.massage ? (
        <>
          <p className="text-center my-10">{state.cart.data?.massage}</p>
        </>
      ) : (
        state.cart.data?.map((product) => {
          return (
            <div
              className=" flex justify-between pr-5 text-stone-700 my-5 sm:my-10"
              key={product?._id}
            >
              <div className=" sm:flex justify-center gap-4">
                <img
                  src={`http://localhost:5000${product?.productId?.Image}`}
                  alt="img"
                  className=" w-24 p-1"
                  onClick={() =>
                    navigate(`/product/${product?.productId?._id}`)
                  }
                />

                <div className="font-medium">
                  <p className="font-medium text-black">
                    {product?.productId?.Name}
                  </p>
                  <p>₹ {product?.productId?.Price} / 250 g</p>
                  <p>{product?.productType}</p>
                  <p>
                    {product?.weight}{" "}
                    {product?.weight === "250" || product?.weight === "500"
                      ? "g"
                      : "kg"}
                  </p>
                </div>
              </div>

              <div className=" pt-7 sm:mr-16 text-center font-medium">
                <span>{product?.quantity}</span>
              </div>
              <div className="flex flex-col">
                <div className=" pt-7 text-center font-medium mb-4">
                  <span>₹ {product?.totalPrice}</span>
                </div>
                <button
                  onClick={() => removeCartItem(product?._id)}
                  className="border font-normal p-1"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default CartItem;
