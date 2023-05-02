import React from "react";
import CakesList from "../components/CakesList";
import AboutOurStore from "../components/AboutOurStore";
import cakeimg from "../images/logincake.jpg";

function Home() {
  return (
    <>
      <div className=" container m-auto flex w-full justify-center pb-8 md:pb-20 sm:pb-12 pt-5">
        <div className=" flex flex-col justify-evenly items-center mt-4 lg:mt-20 md:mt-14 sm:mt-8">
          <h1 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-center px-5 sm:px-10 max-lg:mb-3">
            The Perfect Baked Cake EveryDay !
          </h1>
          <p className="text-sm lg:text-xl md:text-lg sm:text-base text-stone-600 px-5 sm:px-10 max-lg:mb-3">
            Whether for a celebration or just to indulge in a sweet treat, cake
            is the perfect gift for anyone who loves to enjoy the simple
            pleasures of life.
          </p>
          <a
            href="#cakelist"
            className=" bg-orange-400 px-3 sm:px-5 py-1 sm:py-2 text-xs lg:text-lg md:text-base sm:text-sm rounded-full font-bold shadow-xl"
          >
            Order Now
          </a>
        </div>
        <img
          src={cakeimg}
          alt="cake img"
          className=" w-2/5 mt-8 lg:mt-24 md:mt-18 sm:mt-12"
        />
      </div>
      <AboutOurStore />
      <CakesList />
    </>
  );
}

export default Home;
