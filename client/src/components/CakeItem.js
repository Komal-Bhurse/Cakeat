import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getAllCartItems } from "../redux/slices/cartSlice";
import Login from "../pages/Login";

function CakeItem() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  const onCloseClick = () => {
    return setShowDialog(false);
  };

  const isUser = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      setShowDialog(true);
    }
  };

  async function addToCart(id, price) {
    try {
      await axios.post(
        `http://localhost:5000/api/cart/${id}`,
        { price },
        { withCredentials: true }
      );
      dispatch(getAllCartItems());
    } catch (error) {
      alert(error);
    }
  }

  if (state.product.isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {state.product.data?.map((product) => {
        return (
          <div
            className=" p-2 rounded-xl bg-orange-200 w-40 md:w-48 sm:w-44 shadow-xl"
            key={product._id}
          >
            <img
              src={`http://localhost:5000${product.Image}`}
              alt={product.Name}
              className="w-44 h-36 md:h-40 rounded-lg mx-auto cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            />

            <h1 className="text-lg md:text-xl font-medium mt-1">
              {product.Name}
            </h1>
            <div className=" text-base md:text-lg font-medium flex justify-between items-center">
              <span className="text-orange-700">₹ {product.Price}</span>
              <button
                onClick={() => {
                  isUser();
                  if (state.user.isUser) {
                    addToCart(product._id, product.Price);
                  }
                }}
                className="text-xl md:text-2xl px-2 py-1 text-white rounded-full font-semibold bg-orange-600 cursor-pointer"
              >
                <i className="uil uil-shopping-cart"></i>
              </button>
            </div>
          </div>
        );
      })}
      {showDialog && <Login onCloseClick={onCloseClick} />}
    </>
  );
}

export default CakeItem;
