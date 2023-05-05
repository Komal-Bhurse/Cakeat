import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signUpSchema } from "../formvalidation/validation";
import site from "../config/api.js"

const initialValues = {
  name: "",
  email: "",
  mobNumber: "",
  password: "",
};

function SignUp({ setToggle }) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${site}/api/register`,
            values
          );
          alert(response.data.massage);
        } catch (error) {
          alert(error);
        }
        action.resetForm();
      },
    });

  return (
    <>
      <div className="p-5 pb-1 md:p-10 sm:p-7 sm:w-2/5 ">
        <h1 className="text-center text-lg md:text-2xl sm:text-xl font-medium sm:mb-2">
          Sign Up
        </h1>
        <p className="text-stone-600 mb-5 max-sm:hidden">
          Register to get started.
        </p>
      </div>
      <div className="p-5 md:p-10 sm:p-7 sm:w-3/5">
        <form onSubmit={handleSubmit}>
          <input
            type={"Text"}
            name="name"
            placeholder={"Name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2"
          />
          {errors.name && touched.name ? (
            <p className="text-red-500 mb-1 text-sm">{errors.name}</p>
          ) : (
            ""
          )}
          <input
            required
            type={"email"}
            name="email"
            placeholder={"Email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2 mt-1"
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 mb-1 text-sm">{errors.email}</p>
          ) : null}
          <input
            type={"Text"}
            name="mobNumber"
            placeholder={"Mobile"}
            value={values.mobNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2 mt-1"
          />
          {errors.mobNumber && touched.mobNumber ? (
            <p className="text-red-500 mb-1 text-sm">{errors.mobNumber}</p>
          ) : null}
          <input
            type={"password"}
            name="password"
            placeholder={"Password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-1 outline-none border-b-2 mt-1"
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 mb-5 text-sm">{errors.password}</p>
          ) : null}
          <button
            type={"submit"}
            className="w-full mb-5 mt-3 p-2 font-medium bg-orange-400"
          >
            Register
          </button>
        </form>

        <span className="mr-20 text-stone-600">Existing User?</span>
        <button className="text-stone-600" onClick={() => setToggle(true)}>
          Login
        </button>
      </div>
    </>
  );
}

export default SignUp;
