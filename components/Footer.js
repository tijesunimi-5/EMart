import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white text-center  h-[30vh] rounded-tr-2xl rounded-tl-2xl card  mt-[-20px]">
      <div>
        <h1 className="text-center  text-4xl font-bold pt-5 ">EMart</h1>
        <p className="text-xl px-3 font-semibold pt-4">
          Your one-stop shop for the latest gadgets and innovations
        </p>

        <div className="flex  text-3xl w-[250px] ml-14 mt-5 justify-between">
          <FaFacebookSquare />
          <FaInstagramSquare />
          <FaTwitterSquare />
          <FaLinkedin />
        </div>
      </div>
    </footer>
  );
}

export default Footer
