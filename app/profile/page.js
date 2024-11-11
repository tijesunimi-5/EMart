"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaMinus, FaPen, FaPenAlt } from "react-icons/fa";
import { UserContext } from "../../components/userContext";
import Link from "next/link";

const page = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState();
  // const [userImage, setUserImage] = useState()
  const [defaultPicture, setDefaultPicture] = useState("/uploads/picture.jpg");
  const [availableUser, setAvailableUser ] = useState(<p className="text-2xl font-bold ml-9 mb-2 lowercase">@Guest</p>);
  const [userBio, setUserBio] = useState(
    <p className="bio">A guest user exploring the website</p>
  );
  const [updateMessage, setUpdateMessage] = useState('')

  //To use userContext---->
  const { user } = useContext(UserContext);

  useEffect(() => {
     if (user) {
       setAvailableUser(
         <h1 className="userName ml-8 text-2xl font-bold">{user.username}</h1>
         
       );
       setDefaultPicture(`${user.image}`)
       setUserBio(<p className="bio">{user.bio}</p>);
     } 
  }, [user])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const uploadImage = document.querySelector(".uploadImage");
    if (!image) {
      setUploadMessage(
        <p className="text-xl text-red-500">Select an image to upload</p>
      );

      setTimeout(() => {
        setUploadMessage("");
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Image uploaded successfully!");
    } else {
      console.log("Failed to upload image.");
    }

    uploadImage.style.display = "none";
  };

  const profileBtn = () => {
    const uploadImage = document.querySelector(".uploadImage");

    uploadImage.style.display = "block";
    console.log("working");
  };

  const closeUpload = () => {
    const uploadImage = document.querySelector(".uploadImage");

    uploadImage.style.display = "none";
  };

  const productRef = useRef(null);
  const historyRef = useRef(null);
  const PendingRef = useRef(null);
  const deliveryRef = useRef(null);

  useEffect(() => {
    if (productRef.current) {
      productRef.current.addEventListener("click", () => {
        productRef.current.classList.add("active");
        historyRef.current.classList.remove("active");
        PendingRef.current.classList.remove("active");
        deliveryRef.current.classList.remove("active");

        

        setUpdateMessage("Product not available Sign Up");
      });
    }
  }, [productRef]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.addEventListener("click", () => {
        productRef.current.classList.remove("active");
        historyRef.current.classList.add("active");
        PendingRef.current.classList.remove("active");
        deliveryRef.current.classList.remove("active");

        setUpdateMessage("History not available Sign Up");
      });
    }
  }, [historyRef]);

  useEffect(() => {
    if (PendingRef.current) {
      PendingRef.current.addEventListener("click", () => {
        productRef.current.classList.remove("active");
        historyRef.current.classList.remove("active");
        PendingRef.current.classList.add("active");
        deliveryRef.current.classList.remove("active");

        setUpdateMessage("Transactions not available Sign Up");
      });
    }
  }, [PendingRef]);

  useEffect(() => {
    if (deliveryRef.current) {
      deliveryRef.current.addEventListener("click", () => {
        productRef.current.classList.remove("active");
        historyRef.current.classList.remove("active");
        PendingRef.current.classList.remove("active");
        deliveryRef.current.classList.add("active");

        

        setUpdateMessage("Delivery not available Sign Up");
      });
    }
  }, [deliveryRef]);

  const edit = () => {
    
  }

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
          {" "}
          <Button onClick={edit}>
            <Link href={'/settings'} className="py-2" >
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

      {/**This prompts the select image from file........ */}
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
            <li ref={productRef} className="proList " id="proList">
              Products
            </li>
            <li ref={historyRef} className="histList">
              History
            </li>
            <li ref={PendingRef} className="pendList">
              Pending transactions
            </li>
            <li ref={deliveryRef} className="deliList">
              Delivery
            </li>
          </ul>

          <div>
            <div className="message font-bold mt-20 text-center text-xl">
              {updateMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
