import React from "react";
import CakeItem from "./CakeItem";

function CakesList() {
  return (
    <>
      <h1
        className=" m-auto container text-lg md:text-2xl sm:text-xl font-bold text-orange-700 py-1 pl-5 sm:pl-10"
        id="cakelist"
      >
        Cakes
      </h1>
      <div className=" container m-auto md:px-10 py-5 sm:py-10 flex flex-wrap gap-4 sm:gap-6 justify-center">
        <CakeItem />
      </div>
    </>
  );
}

export default CakesList;
