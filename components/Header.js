"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { FaBars, FaCartArrowDown, FaMinusCircle } from "react-icons/fa";
import { FaCartShopping } from 'react-icons/fa6'

const Header = () => {
  return (
    <header className="flex justify-between fixed top-0 right-0 left-0 z-40 px-3 py-2 bg-[#11212D] border-b border-white">
      <Link href={"/"}>
        <h1 className="text-white pt-1 text-2xl font-bold">
          <FaBars className="menu inline mr-2" />
          <FaMinusCircle className="close mr-2 hidden" />
          EMart
        </h1>
      </Link>

      <Link href={"/cart"}>
        <Button>
          <FaCartShopping className="inline mr-2" />
          Cart
        </Button>
      </Link>
    </header>
  );
};

export default Header;
