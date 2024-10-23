import React from 'react'
import { FaArrowRight, FaSearch } from 'react-icons/fa';

const page = () => {
  return (
    <div className="bg-main-bg mt-5 h-[100vh] text-white">
      <div className="pt-20 text-center">
        <h1 className="font-bold text-xl">Search for a product</h1>
        <div className="relative w-[270px] ml-14">
          <input
            type="text"
            className="relative input w-[270px] mt-2 pl-7 h-7"
          />
          <FaSearch className="absolute top-3 ml-1 text-xl border-r-2 border-white pr-1" />
          <FaArrowRight className="absolute right-1 top-3 text-xl border-l-2 pl-1" />
        </div>

        <div className="mt-10 text-start px-8">
          <div>
            <h1 className="text text-3xl font-bold">Phones</h1>
          </div>

          <div className="mt-8">
            <h1 className="text text-3xl font-bold">Laptops</h1>
          </div>

          <div className="mt-8">
            <h1 className="text text-3xl font-bold">Television</h1>
          </div>

          <div className="mt-8">
            <h1 className="text text-3xl font-bold">Others</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
