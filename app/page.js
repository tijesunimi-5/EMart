"use client";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCart } from "../components/cartContext";
import { getAllProducts, searchProductType } from "../data/product";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
// import { easeInOut, motion } from "framer-motion";

const page = () => {
  const product = getAllProducts();
  const [searchMessage, setSearchMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { addToCart } = useCart();
  // const [cartNotify, setCartNotification] = useState();

  const search = () => {
    const searchInput = document.querySelector(".search").value;

    if (!searchInput) {
      setSearchMessage(<p>Enter valid input</p>);
      setTimeout(() => {
        setSearchMessage("");
      }, 3000);
    } else {
      try {
        const results = searchProductType(searchInput);
        setSearchResult(results);
        setSearchMessage("");
      } catch (error) {
        setSearchMessage(<p>{error.message}</p>);
        setTimeout(() => {
          setSearchMessage(" ");
        }, 3000);
        setSearchResult([]);
      }
    }
  };

  return (
    <div className="bg-main-bg mt-5 pb-20 text-white">
      <div className="pt-20 text-center">
        <h1 className="font-bold text-xl">Search for a product</h1>
        <div className="relative w-[270px] ml-14 md:w-[630px] lg:w-[900px] xl:ml-[280px]">
          <label
            htmlFor="search"
            className="absolute z-10 mt-2 pl-1 border-r-2 pr-1 md:py-2 md:text-xl"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            className="search relative input w-[270px] mt-2 pl-16 h-7 xl:border-0 md:w-[650px] md:h-12 md:pl-20 md:text-xl lg:w-[900px] lg:border-0"
          />

          <FaArrowRight
            onClick={search}
            className="searchIn absolute right-1 top-3 text-xl border-l-2 pl-1 md:right-[-7px] md:text-2xl md:bottom-0 md:my-2 lg:right-3"
          />
        </div>

        {searchMessage}
        <div className="searchResult mt-10 text-start px-8 flex overflow-hidden overflow-x-scroll my-10  rounded-md ml-2 md:w-[740px] lg:w-[980px] xl:w-[1400px] xl:ml-16">
          <div className="flex w-[2500px] justify-between">
            {searchResult &&
              searchResult.map((item) => (
                <div className="w-[350px] mr-10 ml-[-20px]">
                  <Card key={item.id}>
                    <div key={item.id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-tr-md rounded-tl-md w-[350px] h-[300px]"
                      />
                    </div>
                    <p className="mt-5">{item.description}</p>
                    <p className="flex justify-between px-5 my-5">
                      <span>Price: {item.price}</span>{" "}
                      <span>Rating: {item.rating}</span>
                    </p>
                    <div className="py-2 ">
                      <Button onClick={() => addToCart(item)} key={item.id}>
                        <span className="px-7">Add To Cart</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="products flex flex-col">
        <h1 className="font-bold text-3xl ml-7 lg:text-5xl">Products</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-x-hidden xl:grid-cols-3 xl:gap-4">
          {product.map((pro) => (
            <div
              key={pro.id}
              className="prod mt-10 w-[350px] ml-3 md:w-[600px] md:ml-20 lg:w-[400px] lg:ml-12 lg:flex "
            >
              <Card key={pro.id}>
                <div className="relative" key={pro.id}>
                  <img
                    src={pro.image}
                    alt={pro.title}
                    className="rounded-tr-md rounded-tl-md w-[350px] pro-image md:w-[600px] md:h-[450px] lg:w-[400px] lg:h-[350px]"
                  />
                </div>
                <p className="mt-5">{pro.description}</p>
                <p className="flex justify-between px-5 my-5">
                  <span>Price: {pro.price}</span>{" "}
                  <span>Rating: {pro.rating}</span>
                </p>
                <div className="py-2 ">
                  <Button
                    onClick={() => {
                      addToCart(pro);
                    }}
                    key={pro.id}
                  >
                    <span className="px-7">Add To Cart</span>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
