import React from "react";
import CategoryCard from "./CategoryCard";

function AboutOurStore() {
  return (
    <div className=" container mx-auto text-center max-md:mb-5 px-3 lg:px-20 sm:px-5 md:h-[70vh]">
      <h1 className=" py-3 text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold">
        Welcome To Our Store
      </h1>
      <p className=" text-center py-2 mb-2 sm:mb-4 px-8 lg:px-32 md:px-24 sm:px-16 text-sm lg:text-xl md:text-lg sm:text-base text-stone-600">
        Our cake store is where delicious and beautiful cakes are crafted with
        the finest and freshest ingredients. From classic to whimsical designs,
        we have a wide variety of options for all occasions.
      </p>
      <CategoryCard />
    </div>
  );
}

export default AboutOurStore;
