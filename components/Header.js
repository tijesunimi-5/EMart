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
      <div className="flex justify-center align-middle">
        {" "}
        <div className="lg:hidden">
          <FaBars
            className="menu inline mr-2 lg:hidden text-white text-2xl font-bold lg:text-4xl mt-[7px]"
            onClick={openDashboard}
          />
          <FaMinusCircle
            className="close mb-2 mr-2 hidden lg:hidden text-white text-2xl font-bold lg:text-4xl mt-[7px]"
            onClick={closeDashboard}
          />
        </div>
        <Link href={"/"}>
          <h1 className="text-white pt-1 text-2xl font-bold lg:text-4xl">
            <span onClick={closeDashboard}>EMart</span>
          </h1>
        </Link>
      </div>

      <div className="text-white hidden lg:flex justify-between w-[400px] mt-2 text-2xl">
        <Link href={"/"} className=" hover:underline transition-all">
          Product
        </Link>
        <Link href={"/profile"} className=" hover:underline transition-all">
          Profile
        </Link>
        <Link href={"/about-us"} className=" hover:underline transition-all">
          About
        </Link>
        <Link href={"/settings"} className=" hover:underline transition-all">
          Settings
        </Link>
      </div>

      <Link href={"/cart"} className="">
        <Button onClick={closeDashboard}>
          <span className="px-4">
            <FaCartShopping className="inline mr-2 lg:pb-1 lg:text-2xl" />
            <span className="lg:text-2xl lg:font-bold">Cart</span>
          </span>
        </Button>
      </Link>
    </header>
  );
};

export default Header;
