import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white text-center relative h-[30vh] border-t bg-main-bg 2xl:h-[50vh]">
      <div>
        <h1 className="text-center  text-4xl font-bold pt-5 md:text-5xl">EMart</h1>
        <p className="text-xl px-3 font-semibold pt-4 md:text-4xl">
          Your one-stop shop for the latest gadgets and innovations
        </p>

        <div className="social flex  text-3xl w-[250px] ml-14 mt-5 justify-between md:text-6xl md:w-[660px] md:mt-14 lg:w-[880px] lg:mt-20 2xl:ml-[320px]">
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
