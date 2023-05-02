import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchProducts } from "../redux/slices/productSlice";

import cakecard from "../images/cake.jpg";
import accessories from "../images/accessories.jpg";
import cookies from "../images/cookies.jpg";

function CategoryCard() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
    <div className=" flex justify-center p-3  gap-3 sm:gap-5">
      <button>
      <div className="p-2 rounded-xl bg-orange-300 w-28 lg:w-40 md:w-36 sm:w-32 shadow-2xl" onClick={()=>dispatch(fetchProducts())}>
        <img src={cakecard} alt="cake" className="h-16 lg:h-28 md:h-24 sm:h-20 rounded-xl mx-auto" />
        <h1 className="text-base lg:text-xl sm:text-lg font-medium">Cakes</h1>
      </div>
      </button>
       <button>
      <div className=" p-2 rounded-xl bg-orange-300 w-28 lg:w-40 md:w-36 sm:w-32 shadow-2xl">
        <img src={accessories} alt="cake" className="h-16 lg:h-28 md:h-24 sm:h-20 rounded-xl mx-auto" />
        <h1 className="text-base lg:text-xl sm:text-lg font-medium">Accessories</h1>
      </div>
      </button>
      <button>
      <div className=" p-2 rounded-xl bg-orange-300 w-28 lg:w-40 md:w-36 sm:w-32 shadow-2xl">
        <img src={cookies} alt="cake" className="h-16 lg:h-28 md:h-24 sm:h-20 rounded-xl mx-auto" />
        <h1 className="text-base lg:text-xl sm:text-lg font-medium">Cookies</h1>
      </div>
      </button>
    </div>
  );
}

export default CategoryCard;
