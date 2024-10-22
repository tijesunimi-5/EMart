"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState([]);

  {/**This fetches products from FAKE STORE API */}
  const fetchProduct = async () => {
    const url = "https://fakestoreapi.com/products/category/electronics";

    try {
      const response = await axios.get(url);
      const result = response.data;

      //Filter gadgets based on keywords in titles
      const phones = result.filter(item => item.title.toLowerCase().includes('samsung') || item.description.toLowerCase().includes('samsung'))
      console.log(phones)
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="bg-main-bg  pt-10  h-[340vh]">
      <div className=" text-white">
        {/**Hero section */}
        <div className=" relative">
          {/* <video src="/EMart.mp4" muted autoPlay loop></video> */}<img src="phone.jpg" alt="phone" className="hero-images" />
          <div className="overlay"></div>
          <div className="absolute top-20 left-9">
            <p className=" w-[300px] text-center font-bold">
              Welcome to your premier destination for the latest and greatest
              gadgets.
            </p>

            <div className="w-[300px] mt-10 text-center">
              <Link href={"/product"}>
                <button onClick={fetchProduct} className="btn">
                  Shop Now!
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/**Welcome section...... */}
        <div className="pt-10 px-3">
          <p>
            We are passionate about bringing you the most innovative and
            cutting-edge technology products to make your life easier, more
            convenient, and more enjoyable. Browser our extensive collection of
            smartphones, laptops, smartwatches, gaming consoles, and more from
            top brands and manufacturers.
          </p>

          <h1 className="mt-20 text-center font-bold">
            Check out our collections and make a choice, them buy
          </h1>

          <div className="w-[350px] h-[400px] rounded-md overflow-x-scroll overflow-hidden ">
            <div className="flex gap-6  w-[650px]">
              <div className="w-[300px] ml-4">
                <Card>
                  <img src="/gadgets.jpg" className="rounded-md" />
                  <div>
                    <h1 className="text-xl font-bold">Gadgets collection</h1>

                    <p className="text-start mb-4 mx-3 mt-2">
                      Are you interested in getting a gadget like a phone,
                      laptop, tablet.... Check out what we have in store for
                      you!
                    </p>

                    <div className="pb-2 ml-[0px]">
                      <Link href={"/product"}>
                        <Button>Shop now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="w-[300px]">
                <Card>
                  <img src="/console.jpg" className="image rounded-md" />
                  <div>
                    <h1 className="text-xl font-bold">Electronics collection</h1>

                    <p className="text-start mb-4 mx-3 mt-2">
                      Are you interested in getting a electronic gadget? Check out what we have in store for
                      you!
                    </p>

                    <div className="pb-2">
                      <Link href={"/product"}>
                        <Button>Shop now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/**About section */}
        <div className="mt-20  py-2">
          <h1 className="underline text-center text-3xl font-bold">About Us</h1>
          <div className="px-2 mt-3">
            <p>
              {" "}
              At EMart, we're committed to providing our customers with an
              exceptional shopping experience. Our team of tech enthusiasts
              works tirelessly to curate a selection of products that cater to
              diverse needs and preferences. We strive to deliver:
            </p>

            <ul className=" list-disc pl-4">
              <li>Competitive pricing</li>
              <li>Fast and reliable shipping</li>
              <li>Excellent customer service</li>
              <li>Secure and trusted payment options</li>
            </ul>

            <h1 className="mt-8 text-2xl font-bold">Our product categories</h1>
            <ul className="list-disc pl-4">
              <li>Smartphones</li>
              <li>Laptops and tablets</li>
              <li>Smartwatches and fitness trackers</li>
              <li>Gaming consoles and accessories</li>
              <li>Headphones and audio equipments</li>
              <li>Power banks and charging solutions</li>
              <li>Gadgets and novelty items</li>
            </ul>
          </div>
        </div>

        {/**Contact section...... */}
        <div>
          <div className="neumorphism mt-20 ml-8">
            <div className="py-3 ">
              <h1 className="text-center text-xl font-bold ">Contact Us</h1>
              <form className="px-3 py-3">
                <div>
                  <label htmlFor="email" className="pr-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-[200px] pl-2"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="message" className="pr-2">
                    Message:
                  </label>
                  <textarea
                    type="text"
                    id="message"
                    className="input w-[260px] h-16 pl-2"
                  ></textarea>
                </div>
                <div className="ml-20 mt-5">
                  <Button>Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
