import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAllCartItems } from "../redux/slices/cartSlice";
import Login from "./Login";
import site from "../config/api";

function ProductDetials() {
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("250");
  const [productType, setProductType] = useState("EggLess");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const params = useParams();

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

  const fetchProduct = async () => {
    const result = await axios.get(
      `${site}/api/product/${params.id}`
    );
    setData(result.data);
  };

  fetchProduct();

  async function addToCart(id, price) {
    try {
      await axios.post(
        `${site}/api/cart/${id}`,
        { quantity, weight, productType, price },
        { withCredentials: true }
      );
      dispatch(getAllCartItems());
    } catch (error) {
      alert(error);
    }
  }

  const changeQuantity = (e) => {
    if (e.target.value === "decrement") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
    if (e.target.value === "increment") {
      setQuantity(quantity + 1);
    }
  };

  const changeWeight = (e) => {
    if (e.target.value === "250") {
      setWeight("250");
    }
    if (e.target.value === "500") {
      setWeight("500");
    }
    if (e.target.value === "1") {
      setWeight("1");
    }
    if (e.target.value === "2") {
      setWeight("2");
    }
    if (e.target.value === "3") {
      setWeight("3");
    }
  };

  const changeProductType = (e) => {
    if (e.target.value === "EggLess") {
      setProductType("EggLess");
    }
    if (e.target.value === "WithEgg") {
      setProductType("WithEgg");
    }
  };

  const handleOpenRazorpay = async (data, name, email, password) => {
     const res = await axios.get(`${site}/api/getkey`)

    const options = {
      key: res?.key, // Enter the Key ID generated from the Dashboard
      amount: Number(data?.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data?.currency,
      name: "Cakeat",
      order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        try {
          const res = await axios.post(
            `${site}/api/payment/verify`,
            { response },
            { withCredentials: true }
          );
          alert(res.data.massage);
        } catch (error) {
          alert(error);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: password,
      },
      // "notes": {
      //     "address": "Razorpay Corporate Office"
      // },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async (quantity, weight, price) => {
    let amount = price;
    if (quantity && weight) {
      if (weight === "1" || weight === "2" || weight === "3") {
        const weightInGram = weight * 1000;
        amount = quantity * ((weightInGram / 250) * price);
      } else {
        amount = quantity * ((weight / 250) * price);
      }
    }
    try {
      const response = await axios.post(
        `${site}/api/payment/orders`,
        { amount },
        { withCredentials: true }
      );
      handleOpenRazorpay(
        response.data?.data,
        state.user.data?.UserName,
        state.user.data?.Email,
        state.user.data?.Password
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className=" m-auto container flex md:gap-5 sm:gap-3 max-sm:flex-col">
        <div className=" w-full sm:w-2/5">
          <div className="sm:mb-2 p-8 lg:px-10 md:px-5 sm:px-3 sm:py-10">
            <img
              src={`${site}${data?.Image}`}
              alt={data?.Name}
              className="mx-auto"
            />
          </div>
        </div>
        <div className=" py-5 sm:py-10 px-5 sm:px-1">
          <h1 className=" text-lg md:text-2xl sm:text-xl font-normal mb-2 sm:mb-4">
            {data?.Name}
          </h1>
          <p className="mb-2 sm:mb-4">
            <span className="text-xl md:text-3xl sm:text-2xl font-medium">
              ₹ {data?.Price}
              <span className="text-base md:text-xl sm:text-lg font-normal ml-1 sm:ml-2">
                / 250 g
              </span>
            </span>
          </p>
          <p className="mb-3">{data?.Description}</p>
          <p className="mb-3">
            <span className="text-lg sm:text-xl font-normal">Weight</span>
          </p>
          <div className="mb-3">
            <button
              onClick={changeWeight}
              value={"250"}
              className={`border mr-2 sm:mr-3 md:mr-5 py-1 md:py-3 sm:py-2 sm:px-2 ${
                weight === "250" ? "bg-orange-300" : ""
              }`}
            >
              250 g
            </button>
            <button
              onClick={changeWeight}
              value={"500"}
              className={`border mr-2 sm:mr-3 md:mr-5 py-1 md:py-3 sm:py-2 px-1 sm:px-2 md:px-4 ${
                weight === "500" ? "bg-orange-300" : ""
              }`}
            >
              500 g
            </button>
            <button
              onClick={changeWeight}
              value={"1"}
              className={`border mr-2 sm:mr-3 md:mr-5 py-1 md:py-3 sm:py-2 px-1 sm:px-2 md:px-4 ${
                weight === "1" ? "bg-orange-300" : ""
              }`}
            >
              1 kg
            </button>
            <button
              onClick={changeWeight}
              value={"2"}
              className={`border mr-2 sm:mr-3 md:mr-5 py-1 md:py-3 sm:py-2 px-1 sm:px-2 md:px-4 ${
                weight === "2" ? "bg-orange-300" : ""
              }`}
            >
              2 kg
            </button>
            <button
              onClick={changeWeight}
              value={"3"}
              className={`border py-1 md:py-3 sm:py-2 px-1 sm:px-2 md:px-4 ${
                weight === "3" ? "bg-orange-300" : ""
              }`}
            >
              3 kg
            </button>
          </div>
          <p className="mb-3">
            <span className="text-lg sm:text-xl font-normal">Quantity</span>
          </p>
          <p className="mb-3">
            <button
              onClick={changeQuantity}
              value={"decrement"}
              className="border text-xl sm:text-2xl font-normal mr-2 sm:mr-3 px-2 text-white bg-stone-500 rounded-md"
            >
              -
            </button>
            <span className="text-lg sm:text-xl font-normal mr-2 sm:mr-3  text-orange-700 px-2">
              {quantity}
            </span>
            <button
              onClick={changeQuantity}
              value={"increment"}
              className="border text-xl sm:text-2xl font-normal px-2 text-white bg-stone-500 rounded-md"
            >
              +
            </button>
          </p>
          <p className="mb-3">
            <span className="text-lg sm:text-xl font-normal">Product Type</span>
          </p>
          <p>
            <button
              onClick={changeProductType}
              value={"EggLess"}
              className={`border mr-3 sm:mr-5 p-2 ${
                productType === "EggLess" ? "bg-orange-300" : ""
              }`}
            >
              EggLess
            </button>
            <button
              onClick={changeProductType}
              value={"WithEgg"}
              className={`border p-2 ${
                productType === "WithEgg" ? "bg-orange-300" : ""
              }`}
            >
              WithEgg
            </button>
          </p>
        </div>
      </div>
      <div className="container m-auto text-center">
        <button
          className=" px-14 py-2 mr-4 text-base md:text-xl sm:text-lg font-bold bg-yellow-400"
          onClick={() => {
            isUser();
            if (state.user.isUser) {
              addToCart(params.id, data?.Price);
            }
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            isUser();
            if (state.user.isUser) {
              handlePayment(quantity, weight, data?.Price);
            }
          }}
          className=" px-16 py-2 text-base md:text-xl sm:text-lg font-bold bg-orange-500"
        >
          Buy Now
        </button>
      </div>
      {showDialog && <Login onCloseClick={onCloseClick} />}
    </>
  );
}

export default ProductDetials;
