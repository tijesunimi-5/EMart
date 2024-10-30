"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { getAllProducts, searchProductType } from "@/data/product";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const page = () => {
  const product = getAllProducts();
  let searchResult;

  const search = () => {
    const search = document.querySelector(".search").value;
    // const searchResult = document.querySelector('.searchResult');

    const results = searchProductType(search);
    console.log(results)
  };

  return (
    <div className="bg-main-bg mt-5 pb-20 text-white">
      <div className="pt-20 text-center">
        <h1 className="font-bold text-xl">Search for a product</h1>
        <div className="relative w-[270px] ml-14">
          <label
            htmlFor="search"
            className="absolute z-10 mt-2 pl-1 border-r-2 pr-1"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            className="search relative input w-[270px] mt-2 pl-16 h-7"
          />

          <FaArrowRight
            onClick={search}
            className="absolute right-1 top-3 text-xl border-l-2 pl-1"
          />
        </div>

        <div className="searchResult mt-10 text-start px-8">
          
        </div>
      </div>

      <div className="products flex flex-col">
        {product.map((pro) => (
          <div key={pro.id} className="mt-10 w-[320px] ml-7">
            <Card key={pro.id}>
              <div className="relative" key={pro.id}>
                <img
                  src={pro.image}
                  alt={pro.title}
                  className="rounded-tr-md rounded-tl-md product-image"
                />
              </div>
              <p className="mt-5">{pro.description}</p>
              <p className="flex justify-between px-5 my-5">
                <span>Price: {pro.price}</span>{" "}
                <span>Rating: {pro.rating}</span>
              </p>
              <div className="py-2 ">
                <Button>
                  <span className="px-7">Add To Cart</span>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
