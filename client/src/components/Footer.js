import React from "react";

function Footer() {
  return (
    <div className=" mt-10">
      <div className=" container m-auto py-4 lg:px-48  sm:flex items-center justify-between">
        <div className="max-sm:text-center max-sm:mb-3">
          <h1 className="text-2xl font-bold text-black mb-2 sm:mb-4">
            Cak<span className="text-orange-500">eat</span>
          </h1>
          <div className=" max-sm:flex max-sm:px-5 max-sm:justify-center max-sm:flex-wrap">
            <p className="mr-5 sm:mb-1">
              <i className="uil uil-map-marker text-xl px-1 sm:mr-3 text-orange-500"></i>
              <span className="text-stone-500 font-medium">Nagpur</span>
            </p>
            <p className="mr-5 sm:mb-1">
              <i className="uil uil-phone-alt text-xl px-1 sm:mr-3 text-orange-500"></i>
              <span className="text-stone-500 font-medium">+91 9168284467</span>
            </p>
            <p className="sm:mb-2">
              <i className="uil uil-envelope-alt text-xl px-1 mr-3 text-orange-500"></i>
              <span className="text-stone-500 font-medium">
                komalbhurse3@gmail.com
              </span>
            </p>
          </div>
          <i className="uil uil-instagram-alt text-xl p-1 text-orange-500"></i>
          <i className="uil uil-twitter text-xl p-1 text-orange-500"></i>
          <i className="uil uil-linkedin text-xl p-1 text-orange-500"></i>
        </div>
        <div className="max-sm:text-center max-sm:mb-3">
          <h1 className="text-xl font-semibold text-black mb-2 sm:mb-4">
            Services
          </h1>
          <div className="max-sm:flex max-sm:px-5 max-sm:justify-center max-sm:flex-wrap">
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Home Delivery
            </p>
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Office Delivery
            </p>
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              At Your place
            </p>
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Birthday Accessories
            </p>
            <p className="text-stone-500 font-medium sm:mb-1">Gifts</p>
          </div>
        </div>
        <div className="max-sm:text-center">
          <h1 className="text-xl font-semibold text-black mb-2 sm:mb-4">
            Cake By occasion
          </h1>
          <div className="max-sm:flex max-sm:px-5 max-sm:justify-center max-sm:flex-wrap">
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Birthday Cakes
            </p>
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Anniversary Cakes
            </p>
            <p className="text-stone-500 font-medium mr-8 sm:mb-1">
              Kids Cakes
            </p>
            <p className="text-stone-500 font-medium sm:mb-1">Events</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
