import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="flex flex-col text-gray-700">
          <div className="flex justify-center items-center gap-3">
            <p className="w-8 md:w-11 h-[1px] bg-gray-700 ml-3"></p>
            <p className="">Our best sellers</p>
          </div>
          <h1>Latest Arivals</h1>
          <div className="flex justify-center items-center gap-3">
            <p className="">Shop now</p>
            <p className="w-8 md:w-11 h-[1px] bg-gray-700 mr-3"></p>
          </div>
        </div>
      </div>
      <img src={assets.hero_img} className="w-full sm:w-1/2"/>
    </div>
  );
};

export default Hero;
