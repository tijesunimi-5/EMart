"use client";
import React, { useState } from "react";
import { FaDropbox } from "react-icons/fa";
import { FaArrowDown, FaDroplet } from "react-icons/fa6";
import Button from "../../../components/Button";

const Page = () => {
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showBioTextarea, setShowBioTextarea] = useState(false);
  const [showDeliveryTextarea, setShowDeliveryTextarea] = useState(false);

  const revealUSerInput = () => {
    setShowUsernameInput(true);
  };

  const revealText = () => {
    setShowBioTextarea(true);
  };

  const revealDelivery = () => {
    setShowDeliveryTextarea(true);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const changeName = document.querySelector(".changeName");
    if (changeName) {
      console.log(changeName.value);
    }
    console.log("working");
  };

  return (
    <div className="bg-main-bg h-[80vh] text-white">
      <div className="pt-20 ml-5">
        <h1 className="flex text-xl" onClick={revealUSerInput}>
          Change Username <FaArrowDown className="pl-2" />
        </h1>
        <div className="inputDiv">
          {showUsernameInput && (
            <input type="text" className="w-[300px] input changeName" />
          )}
        </div>
      </div>

      <div className="pt-10 ml-5">
        <h1 className="flex text-xl" onClick={revealText}>
          Change Bio <FaArrowDown className="bio pl-2" />
        </h1>
        <div className="bioDiv">
          {showBioTextarea && <textarea className="w-[300px] input" />}
        </div>
      </div>

      <div className="pt-10 ml-5">
        <h1 className="flex text-xl" onClick={revealDelivery}>
          Set delivery address <FaArrowDown className="pl-2" />
        </h1>
        <div className="deliveryDiv">
          {showDeliveryTextarea && <textarea className="input w-[300px]" />}
        </div>
      </div>

      <div className="delivery text-center mt-10">
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Page;
