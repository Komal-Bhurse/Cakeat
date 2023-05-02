import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CartItem from "../components/CartItem";
import Login from "./Login";
import { setUser } from "../redux/slices/userSlice";

function UserCart() {
  const [showDialog, setShowDialog] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  let grandTotal = 0;

  if (!state.cart.data?.massage) {
    state.cart.data?.map((data) => {
      return (grandTotal = grandTotal + Number(data?.totalPrice));
    });
  }

  const onCloseClick = () => {
    return setShowDialog(false);
  };

  const user = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      setShowDialog(true);
    }
  };

  if (JSON.parse(localStorage.getItem("userInfo")) !== null) {
    dispatch(setUser(true));
  }

  const handleOpenRazorpay = async (data, name, email, mobNumber) => {
    const options = {
      key: "rzp_test_u8rRFEb4mv1wlZ", // Enter the Key ID generated from the Dashboard
      amount: Number(data.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Cakeat",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/payment/verify",
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
        contact: mobNumber,
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

  const handlePayment = async (amount, name, email, mobNumber) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/orders",
        { amount },
        { withCredentials: true }
      );
      handleOpenRazorpay(response.data?.data, name, email, mobNumber);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className=" container  mx-auto my-5 pt-2 pb-14 px-5 lg:px-20 md:px-10 sm:px-7">
        <div className="">
          <h1 className="border w-3/5 pl-10 mb-2 py-2 text-base md:text-xl sm:text-lg font-bold bg-white shadow-xl">
            <i className="uil uil-shopping-bag mr-2"></i>
            My Cart
          </h1>
          {state.user.isUser ? (
            <>
              <div className="md:flex gap-5">
                <div className="border p-2 w-full md:w-3/5 bg-white shadow-xl">
                  <div className="flex justify-between sm:pr-9 sm:pl-16 mb-3">
                    <h1 className="font-bold text-orange-500 ">Product</h1>
                    <h1 className=" font-bold text-orange-500">quantity</h1>
                    <h1 className=" font-bold text-orange-500 ">Total</h1>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <CartItem />
                  </div>
                  <div className=" p-2 font-medium text-right">
                    <Link to={"/"}>
                      <button className="border py-1 px-2 sm:px-5  sm:mr-2 text-white bg-stone-500">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
                {state.cart.data?.massage ? (
                  <></>
                ) : (
                  <div className="max-md:mt-5 md:w-1/4">
                    <div className="border p-2 text-stone-700 font-normal sm:font-medium bg-white shadow-xl">
                      <h1 className="font-semi-bold sm:font-bold text-orange-500 mb-3">
                        Price Detials
                      </h1>
                      <div className="mb-2 flex justify-between">
                        <span>Price {state.cart.data?.length} Item</span>
                        <span>₹ {grandTotal}</span>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-500">Free</span>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <span>Amount Payable</span>
                        <span>₹ {grandTotal}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() =>
                          handlePayment(
                            grandTotal,
                            state.user.data?.UserName,
                            state.user.data?.Email,
                            state.user.data?.MobNumber
                          )
                        }
                        className="mt-5 font-normal sm:font-medium py-1 px-5 sm:px-10 bg-orange-400 shadow-lg"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="border bg-white shadow-xl w-full h-60 text-center">
                <h1 className="mt-16 mb-5 ">Please Login to See your Cart</h1>
                <button
                  onClick={() => {
                    user();
                    setShowDialog(true);
                  }}
                  className=" py-1 sm:px-10 px-5 bg-orange-400 shadow-lg"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {showDialog && <Login onCloseClick={onCloseClick} />}
    </>
  );
}

export default UserCart;
