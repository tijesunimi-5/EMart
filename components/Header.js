"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { FaBars, FaCartArrowDown, FaMinusCircle } from "react-icons/fa";
import { FaCartShopping } from 'react-icons/fa6'

const Header = () => {
  const openDashboard = () => {
    const bar = document.querySelector('.menu');
    const close = document.querySelector('.close');
    const dash = document.querySelector('.dash');

    bar.style.display = 'none';
    close.style.display = 'inline';
    dash.style.display = 'block'
  }

  const closeDashboard = () => {
    const bar = document.querySelector(".menu");
    const close = document.querySelector(".close");
    const dash = document.querySelector('.dash')

    bar.style.display = 'inline'
    close.style.display = 'none'
    dash.style.display = 'none'
  }

 

  return (
    <header className="flex justify-between fixed top-0 right-0 left-0 z-40 px-3 py-2 bg-[#11212D] border-b border-white lg:px-5">
      <Link href={"/"}>
        <h1 className="text-white pt-1 text-2xl font-bold lg:text-4xl">
          <FaBars
            className="menu mb-2 inline mr-2 lg:hidden"
            onClick={openDashboard}
          />
          <FaMinusCircle
            className="close mb-2 mr-2 hidden lg:hidden"
            onClick={closeDashboard}
          />
          <span onClick={closeDashboard}>EMart</span>
        </h1>
      </Link>

      <div className="text-white hidden lg:flex justify-between w-[300px] mt-2 text-2xl">
        <Link href={"/product"} className=" hover:underline transition-all">
          Product
        </Link>
        <Link href={"/#about-us"} className=" hover:underline transition-all">
          About
        </Link>
        <Link href={"/settings"} className=" hover:underline transition-all">
          Settings
        </Link>
      </div>

      <Link href={"/cart"} className="">
        <Button>
          <FaCartShopping className="inline mr-2 lg:pb-1 lg:text-2xl" />
          <span className="lg:text-2xl lg:font-bold">Cart</span>
        </Button>
      </Link>
    </header>
  );
};

export default Header;
