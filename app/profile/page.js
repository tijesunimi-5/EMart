"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPen } from "react-icons/fa";
import { UserContext } from "../../components/userContext";
import Link from "next/link";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [defaultPicture, setDefaultPicture] = useState("/uploads/picture.jpg");
  const [availableUser, setAvailableUser] = useState(
    <p className="text-2xl font-bold ml-9 mb-2 lowercase">@Guest</p>
  );
  const [userBio, setUserBio] = useState(
    <p className="bio">A guest user exploring the website</p>
  );

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setAvailableUser(
        <h1 className="userName ml-8 text-2xl font-bold">{user.username}</h1>
      );
      setDefaultPicture(`${user.image || "/uploads/picture.jpg"}`);
      setUserBio(<p className="bio">{user.bio}</p>);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      setUploadMessage(
        <p className="text-xl text-red-500">Select an image to upload</p>
      );
      setTimeout(() => setUploadMessage(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", image);


    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        'user-id': user._id
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      updateUser({ image: data.imageUrl }); // Update image in the context
      setUploadMessage(
        <p className="text-xl text-green-500">Image uploaded successfully!</p>
      );
    } else {
      setUploadMessage(
        <p className="text-xl text-red-500">Failed to upload image.</p>
      );
    }
  };

  const profileBtn = () => {
    const uploadImage = document.querySelector(".uploadImage");
    uploadImage.style.display = "block";
  };

  const closeUpload = () => {
    const uploadImage = document.querySelector(".uploadImage");
    uploadImage.style.display = "none";
  };

  const edit = () => {
    // Redirect to settings page for editing
  };

  return (
    <div className="bg-main-bg h-[100vh] text-white">
      <div className="pt-10 relative">
        {/**Real profile */}
        <div className="bg-[#11212D] border-b h-[150px] relative"></div>
        <div
          className="profile rounded-full  w-[150px] h-[150px] ml-4 absolute bottom-[-80px] border-2 border-[#]"
          onClick={() => {
            document.getElementById("profileBtn").click();
          }}
          style={{
            backgroundImage: `url(${preview || defaultPicture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="flex ml-36 mt-5">
        <div className="ml-7 mr-3 h-4">
          <Button onClick={edit}>
            <Link href={"/settings"} className="py-2">
              <FaPen />
            </Link>
          </Button>
        </div>

        <div>
          <Button onClick={profileBtn}>
            <span id="profileBtn" className="py-2 px-4">
              Change Profile
            </span>
          </Button>
        </div>
      </div>

      {/**This prompts the select image from file */}
      <div className="uploadImage text-center mt-20 w-[350px] ml-3 absolute top-0 hidden">
        <Card>
          <div className="h-[260px] relative text-center align-middle">
            <FaMinus
              className="right-4 absolute mt-1 text-xl text-red-500"
              onClick={closeUpload}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-20 mt-4"
            />
            {preview && (
              <img
                src={preview}
                alt="Image Preview"
                className="w-[200px] h-[150px] my-3 ml-20"
              />
            )}
            <Button onClick={handleUpload}>Upload Image</Button>
            {uploadMessage}
          </div>
        </Card>
      </div>

      <div className="mt-8 mx-2">
        <div className="uppercase">{availableUser}</div>

        <div>{userBio}</div>

        <div className="mt-5">
          <ul className="flex justify-between">
            <li className="proList">Products</li>
            <li className="histList">History</li>
            <li className="pendList">Pending transactions</li>
            <li className="deliList">Delivery</li>
          </ul>

          <div>
            <div className="message font-bold mt-20 text-center text-xl">
              {uploadMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
