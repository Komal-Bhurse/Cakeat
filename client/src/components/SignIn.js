import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";

import { userInfo } from "../redux/slices/userSlice";
import { getAllCartItems } from "../redux/slices/cartSlice";
import { setUser } from "../redux/slices/userSlice";

import { signInSchema } from "../formvalidation/validation";
import loginimg from "../images/loginimg.jpg";

const initialValues = {
  Email: "",
  Password: "",
};

function SignIn({ setToggle, onCloseClick }) {
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            "api/login",
            values,
            { withCredentials: true }
          );

          if (response.data.user) {
            dispatch(userInfo(response.data.user));
            dispatch(getAllCartItems());
            onCloseClick();
            dispatch(setUser(true));
          }
          if (response.data.massage) {
            alert(response.data.massage);
          }
        } catch (error) {
          alert(error);
        }

        action.resetForm();
      },
    });

  return (
    <>
      <div className="p-5 pb-1 md:p-10 sm:p-7 sm:w-2/5">
        <h1 className="text-center text-lg md:text-2xl sm:text-xl font-medium sm:mb-2">
          Login
        </h1>
        <p className="text-stone-600 mb-5 max-sm:hidden">
          Get access to your Orders.
        </p>
        <img src={loginimg} alt="login-img" className="max-sm:hidden" />
      </div>
      <div className="p-5 md:p-10 sm:p-7 sm:w-3/5">
        <form onSubmit={handleSubmit}>
          <input
            type={"email"}
            name="Email"
            placeholder={"Email"}
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2 mb-1"
          />
          {errors.Email && touched.Email ? (
            <p className="text-red-500 mb-5 text-sm">{errors.Email}</p>
          ) : (
            ""
          )}
          <input
            type={"password"}
            name="Password"
            placeholder={"Password"}
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2 mb-1 mt-3"
          />
          {errors.Password && touched.Password ? (
            <p className="text-red-500 mb-5 text-sm">{errors.Password}</p>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="w-full mb-10 mt-10 p-2 font-medium bg-orange-400"
          >
            Login
          </button>
        </form>
        <span className="sm:mr-20 mr-5 text-stone-600">New to Cakeat?</span>
        <button className="text-stone-600" onClick={() => setToggle(false)}>
          Create an account
        </button>
      </div>
    </>
  );
}

export default SignIn;
