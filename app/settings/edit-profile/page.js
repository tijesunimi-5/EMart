// "use client";
// import React from "react";
// import { FaDropbox } from "react-icons/fa";
// import { FaArrowDown, FaDroplet } from "react-icons/fa6";
// import Button from "../../../components/Button";

// const page = () => {

//   const revealUSerInput = () => {
//     const inputDiv = document.querySelector(".inputDiv");

//     //this line of code checks if an element with input class already exist. this is will help stop creating more than one input element
//     const divElement = inputDiv.getElementsByClassName("input");
//     if (divElement.length > 0) {
//       console.log("div contains element");
//       return;
//     }

//     const input = document.createElement("input");
//     input.type = 'text';
//     input.className = "w-[300px] input changeName";

//     inputDiv.appendChild(input);
//     console.log(inputDiv);
//   };

//   //this reveals Bio Textarea
//   const revealText = () => {
//     const bioDiv = document.querySelector(".bioDiv");

//     const divElement = bioDiv.getElementsByClassName("input");
//     if (divElement.length > 0) {
//       console.log("div contains Element");
//       return;
//     }

//     const textarea = document.createElement("textarea");
//     textarea.className = "w-[300px] input";

//     bioDiv.appendChild(textarea);
//   };

//   //this reveals Delivery text area
//   const revealDelivery = () => {
//     const deliveryDiv = document.querySelector(".deliveryDiv");

//     const divElement = deliveryDiv.getElementsByClassName("input");
//     if (divElement.length > 0) {
//       console.log("div contains Element");
//       return;
//     }

//     const textarea = document.createElement("textarea");
//     textarea.className = "input w-[300px]";

//     deliveryDiv.appendChild(textarea);
//   };

//   const changeName = document.querySelector(".changeName");

//   const saveChanges = (e) => {
//     e.preventDefault();

//     console.log(changeName.value)
//     console.log('working');
//   };

  
  


//   return (
//     <div className="bg-main-bg h-[80vh] text-white">
//       <div className="pt-20 ml-5">
//         <h1 className="flex text-xl" onClick={revealUSerInput}>
//           Change Username <FaArrowDown className="pl-2" />
//         </h1>
//         <div className="inputDiv"></div>
//       </div>

//       <div className="pt-10 ml-5">
//         <h1 className="flex text-xl" onClick={revealText}>
//           Change Bio <FaArrowDown className="bio pl-2" />
//         </h1>
//         <div className="bioDiv"> </div>
//       </div>

//       <div className="pt-10 ml-5">
//         <h1 className="flex text-xl" onClick={revealDelivery}>
//           Set delivery address <FaArrowDown className="pl-2" />
//         </h1>
//         <div className="deliveryDiv"></div>
//       </div>

//       <div className="delivery text-center mt-10">
//         <Button onClick={saveChanges}>Save Changes</Button>
//       </div>
//     </div>
//   );
// };

// export default page;


import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
