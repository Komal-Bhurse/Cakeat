import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Login({ onCloseClick }) {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[hsl(250,60%,99%)] sm:flex sm:h-[400px] rounded-xl">
        {toggle ? (
          <SignIn setToggle={setToggle} onCloseClick={onCloseClick} />
        ) : (
          <SignUp setToggle={setToggle} />
        )}
        <i
          onClick={onCloseClick}
          className="uil uil-times fixed top-[-12px] right-[-38px] pt-0 text-2xl md:text-4xl sm:text-3xl font-bold text-[hsl(250,60%,99%)] cursor-pointer"
        />
      </div>
    </>
  );
}

export default Login;
