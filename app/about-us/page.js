"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-main-bg  pt-10  ">
      <div className=" text-white">
        {/**Hero section */}
        <div className=" relative">
          {/* <video src="/EMart.mp4" muted autoPlay loop></video> */}
          <img
            src="phone.jpg"
            alt="phone"
            className="hero-images md:w-[768px] md:h-[320px] lg:w-[1008px] lg:h-[450px] 2xl:w-[1536px] 2xl:h-[500px]"
          />
          <div className="overlay md:w-[768px] md:h-[320px] lg:w-[1008px] lg:h-[450px] 2xl:w-[1516px] 2xl:h-[500px]"></div>
          <div className="absolute top-20 left-9">
            <p className="hero-text w-[300px] text-center font-bold md:w-[450px] md:ml-[100px] md:text-2xl lg:text-4xl lg:w-[650px] lg:ml-[120px] 2xl:w-[850px] 2xl:ml-[250px] 2xl:mt-20">
              Welcome to your premier destination for the latest and greatest
              gadgets.
            </p>

            <div className=" w-[300px] mt-10 text-center md:ml-[170px] lg:w-[400px]">
              <Link href={"/"}>
                <button className="btn lg:w-[200px] lg:text-3xl lg:ml-36 lg:mt-20 lg:h-12 2xl:ml-[450px] 2xl:text-4xl">
                  Shop Now!
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/**Welcome section...... */}
        <div className="pt-10 px-3">
          <p className="info-text md:w-[720px] md:text-xl lg:text-2xl lg:w-[995px] 2xl:px-9 2xl:w-[1300px]">
            We are passionate about bringing you the most innovative and
            cutting-edge technology products to make your life easier, more
            convenient, and more enjoyable. Browser our extensive collection of
            smartphones, laptops, smartwatches, gaming consoles, and more from
            top brands and manufacturers.
          </p>

          <h1 className="mt-20 text-center font-bold md:text-xl lg:text-3xl">
            Check out our collections and make a choice, them buy
          </h1>

          <div className="info-card-div w-[350px] h-[400px] rounded-md overflow-x-scroll overflow-hidden md:w-[750px] md:pl-8 md:overflow-x-hidden lg:ml-20 lg:mt-5 2xl:ml-[200px] 2xl:h-[500px] 2xl:w-[1000px]">
            <div className="flex gap-6  w-[650px] md:gap-10 md:w-[850px] md:ml-10 lg:w-[720px] 2xl:w-[920px] 2xl:gap-28">
              <div className="w-[300px] ml-4 2xl:w-[400px]">
                <Card>
                  <img src="/gadgets.jpg" className="rounded-md" />
                  <div>
                    <h1 className="text-xl font-bold">Gadgets collection</h1>

                    <p className="text-start mb-4 mx-3 mt-2 2xl:text-xl">
                      Are you interested in getting a gadget like a phone,
                      laptop, tablet.... Check out what we have in store for
                      you!
                    </p>

                    <div className="pb-2 ml-[0px]">
                      <Link href={"/"}>
                        <Button>
                          <span className="px-5">Shop now</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="w-[300px] 2xl:w-[400px]">
                <Card>
                  <img
                    src="/console.jpg"
                    className="image rounded-md 2xl:w-[400px] 2xl:h-[270px]"
                  />
                  <div>
                    <h1 className="text-xl font-bold">
                      Electronics collection
                    </h1>

                    <p className="text-start mb-4 mx-3 mt-2 2xl:text-xl">
                      Are you interested in getting a electronic gadget? Check
                      out what we have in store for you!
                    </p>

                    <div className="pb-2">
                      <Link href={"/"}>
                        <Button>
                          <span className="px-5">Shop now</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/**About section */}
        <div className="mt-20  py-2 md:px-5" id="about-us">
          <h1 className="underline text-center text-3xl font-bold">About Us</h1>
          <div className="px-2 mt-3">
            <p className="md:text-xl 2xl:text-2xl">
              {" "}
              At EMart, we're committed to providing our customers with an
              exceptional shopping experience. Our team of tech enthusiasts
              works tirelessly to curate a selection of products that cater to
              diverse needs and preferences. We strive to deliver:
            </p>

            <ul className=" list-disc pl-4 md:text-xl 2xl:text-2xl">
              <li>Competitive pricing</li>
              <li>Fast and reliable shipping</li>
              <li>Excellent customer service</li>
              <li>Secure and trusted payment options</li>
            </ul>

            <h1 className="mt-8 text-2xl font-bold 2xl:text-3xl">
              Our product categories
            </h1>
            <ul className="list-disc pl-4 md:text-xl 2xl:text-2xl">
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
        <div className="pb-20">
          <div className="neumorphism contact mt-20 ml-8 md:w-[500px] md:ml-32 lg:w-[600px] lg:ml-[200px] 2xl:ml-[430px]">
            <div className=" py-3 ">
              <h1
                className="text-center text-xl font-bold 
               lg:text-3xl"
              >
                Contact Us
              </h1>
              <form className="px-3 py-3">
                <div>
                  <label htmlFor="email" className="pr-2 lg:text-2xl">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-[200px] pl-2 md:w-[470px]"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="message" className="pr-2 lg:text-2xl">
                    Message:
                  </label>
                  <textarea
                    type="text"
                    id="message"
                    className="input w-[260px] h-16 pl-2 md:w-[470px] lg:w-[550px]"
                  ></textarea>
                </div>
                <div className="form-btn ml-20 mt-5 md:ml-48 lg:ml-[250px]">
                  <Button>
                    <span className="px-5">Submit</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
