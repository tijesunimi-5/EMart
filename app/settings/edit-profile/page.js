"use client";
import React, { useContext, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import Button from "../../../components/Button";
import { UserContext } from "../../../components/userContext";

const Page = () => {
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showBioTextarea, setShowBioTextarea] = useState(false);
  const [showDeliveryTextarea, setShowDeliveryTextarea] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  // State variables to store the new values for each field
  const [newBio, setNewBio] = useState(user?.bio || "");
  const [newName, setNewName] = useState(user?.username || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const revealUserInput = () => {
    setShowUsernameInput(true);
  };

  const revealBioTextarea = () => {
    setShowBioTextarea(true);
  };

  const revealDeliveryTextarea = () => {
    setShowDeliveryTextarea(true);
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          newBio,
          newName,
          userAddress,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        updateUser({
          ...user,
          bio: newBio,
          username: newName,
          address: userAddress,
        });
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred during update");
    }
  };

  return (
    <div className="bg-main-bg h-[80vh] text-white">
      <div className="pt-20 ml-5">
        <h1 className="flex text-xl" onClick={revealUserInput}>
          Change Username <FaArrowDown className="pl-2" />
        </h1>
        <div className="inputDiv">
          {showUsernameInput && (
            <input
              type="text"
              className="w-[300px] input changeName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="pt-10 ml-5">
        <h1 className="flex text-xl" onClick={revealBioTextarea}>
          Change Bio <FaArrowDown className="bio pl-2" />
        </h1>
        <div className="bioDiv">
          {showBioTextarea && (
            <textarea
              className="w-[300px] input changeBio"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="pt-10 ml-5">
        <h1 className="flex text-xl" onClick={revealDeliveryTextarea}>
          Set delivery address <FaArrowDown className="pl-2" />
        </h1>
        <div className="deliveryDiv">
          {showDeliveryTextarea && (
            <textarea
              className="input w-[300px] address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="delivery text-center mt-10">
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>

      {message && (
        <p className="text-2xl font-bold text-center text-blue-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default Page;
