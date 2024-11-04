"use client";
import Link from "next/link";
import React from "react";
import { FaTools, FaUser } from "react-icons/fa";
import { FaShop, FaInfo } from "react-icons/fa6";
import Button from "./Button";

const Dashboard = () => {
  const closeDashboard = () => {
    const bar = document.querySelector(".menu");
    const close = document.querySelector(".close");
    const dash = document.querySelector(".dash");

    bar.style.display = "inline";
    close.style.display = "none";
    dash.style.display = "none";
  };

  return (
    <div className="dash fixed top-0 text-white bg-main-bg w-full h-[70vh] z-20 hidden">
      <div className="pt-16">
        <div className="border-b border-white">
          <Link href={"/profile"} className="flex" onClick={closeDashboard}>
            <FaUser className="mx-4 text-2xl mt-1" />
            <span className="font-bold text-3xl ">Profile</span>
          </Link>
        </div>

        <div className="border-b border-white mt-5" onClick={closeDashboard}>
          <Link href={"/"} className="flex">
            <FaShop className="mx-4 text-2xl mt-1" />
            <span className="font-bold text-3xl ">Products</span>
          </Link>
        </div>

        <div className="border-b border-white mt-5" onClick={closeDashboard}>
          <Link href={"/about-us"} className="flex">
            <FaInfo className="mx-4 text-2xl mt-1" />
            <span className="font-bold text-3xl ">About Us</span>
          </Link>
        </div>

        <div className="border-b border-white mt-5" onClick={closeDashboard}>
          <Link href={"/settings"} className="flex">
            <FaTools className="mx-4 text-2xl mt-1" />
            <span className="font-bold text-3xl ">Settings</span>
          </Link>
        </div>

        <div className="text-center absolute bottom-0 left-36 mb-4">
          <Button onClick={closeDashboard}>
            <Link href={"/register"}>
              <span className="px-4">Logout</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
