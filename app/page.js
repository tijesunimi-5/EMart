"use client";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCart } from "../components/cartContext";
import { getAllProducts, searchProductType } from "../data/product";
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import useTracker from "../lib/useTracker";
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";

const page = () => {
  const product = getAllProducts();
  const [searchMessage, setSearchMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { addToCart } = useCart();
  const { addCart } = useTracker("home page");

  const search = () => {
    console.log("Search function called");
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

  const handleAddToCart = async (product) => {
    addToCart(product);
    addCart({
      name: product.title,
      productId: product.id,
      price: product.price,
    });

    console.log(`Product "${product.title}" added to cart and event tracked.`);
  };

  return (
    <div className="bg-main-bg mt-5 pb-20 text-white">
      <div className="pt-12 text-center">
        {/* <h1 className="font-bold text-xl">Search for a product</h1> */}
        <div className="relative w-screen md:w-[630px] lg:w-[900px] xl:ml-[280px] flex justify-center items-center">
          {/* <input type="text" className="w-[300px] mx-8 mt-5" onClick={search} /> */}
          <SearchInput onclick={search} /> 
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
                      <Button
                        onClick={() => handleAddToCart(item)}
                        key={item.id}
                      >
                        Add to cart
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
                <div className="my-2">
                  <Button styles={'w-[120px] py-1 tracking-wider text-[15px]'}
                    onClick={() => {
                      handleAddToCart(pro);
                    }}
                    key={pro.id}
                  >
                    Add To Cart
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="userConsent"
        style={{ background: "#2b373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to track user behaviot for analytics and
        recommendations, in compliance with NDPR.
      </CookieConsent>
      <Footer />
    </div>
  );
};

export default page;
