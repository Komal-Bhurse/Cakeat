import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Login from "../pages/Login";
import { userInfo } from "../redux/slices/userSlice";
import { cartItems } from "../redux/slices/cartSlice";
import { setUser } from "../redux/slices/userSlice";

function Header() {
  const [showDialog, setShowDialog] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onCloseClick = () => {
    return setShowDialog(false);
  };

  const logout = async () => {
    const response = await axios.post(
      "https://cakeat.vercel.app/api/logout",
      {},
      { withCredentials: true }
    );
    if (response.data.massage === "logout successfull") {
      localStorage.setItem("userInfo", null);
      localStorage.setItem("cartItems", null);
      const value = JSON.parse(localStorage.getItem("userInfo"));
      const items = JSON.parse(localStorage.getItem("cartItems"));
      dispatch(userInfo(value));
      dispatch(cartItems(items));
      dispatch(setUser(false));
    }
  };

  return (
    <>
      <div className="sticky top-0 w-full drop-shadow-lg bg-[hsl(250,60%,99%)]">
        <nav className="container m-auto py-2 sm:px-9 max-sm:px-3 flex justify-between">
          <div className="flex items-center gap-5">
            <div>
              <h1 className=" text-black text-3xl  sm:font-bold max-sm:font-medium">
                Cak<span className="text-orange-500">eat</span>
              </h1>
            <span className="text-stone-500">Lets celebrate</span>
            </div>
            <Link to={"/"}>
            <button className="uil uil-home px-1 text-2xl text-stone-600"></button>
            </Link>
          </div>

          <div className=" flex items-center px-1 text-2xl">
            <div className="sm:mr-10 max-sm:mr-5 px-2">
              {state.user.data ? (
                <>
                  <i className="uil uil-user mr-1"></i>
                  <span className="text-base mr-3">
                    {state.user.data?.UserName}
                  </span>
                  <button className="text-base" onClick={logout}>
                    LogOut
                  </button>
                </>
              ) : (
                <button onClick={() => setShowDialog(true)}>
                  <i className="uil uil-user mr-1"></i>
                  <span className="text-base">Login</span>
                </button>
              )}
            </div>
            <div className="mr-10 px-2 max-sm:hidden">
              <Link to={"/admin"}>
                <span className="text-base">Admin</span>
              </Link>
            </div>
            <div className="sm:px-2">
              <Link to={"/cart"}>
                <i className="uil uil-shopping-cart"></i>
                <span className="text-base mr-1">Cart</span>
              </Link>
              <span className="text-base text-orange-700 font-medium">
                ({state.cart.data?.length})
              </span>
            </div>
          </div>
        </nav>
      </div>
      {showDialog && <Login onCloseClick={onCloseClick} />}
    </>
  );
}

export default Header;
