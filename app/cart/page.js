"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { CartProvider, useCart } from "../../components/cartContext";
import Link from "next/link";
import React, { useContext } from "react";

const page = () => {
  const { cart, setCart } = useCart();


  //this converts the price of each products into numbers 
  const convertPriceToInt = (price) => {
    if (price.includes("k")) {
      return parseInt(price.replace("N", "").replace("k", "")) * 1000;
    } else if (price.includes("M")) {
      return parseFloat(price.replace("N", "").replace("M", "")) * 1000000;
    } else {
      return parseInt(price.replace("N", ""));
    }
  };

  //this multiplies the quantity with converted price
  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = convertPriceToInt(item.price);
    return sum + itemPrice * item.quantity;
  }, 0);

  //this function increases quantity of an item
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  }

  //this function decreases quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      //remove item
      updatedCart.splice(index, 1)
    }
    setCart(updatedCart);
  }

  //this function deletes an item
  const deleteItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart)
  }

  return (
    <div className="relative pt-14  bg-main-bg text-white overflow-hidden">
      <h1 className="text-4xl text-center underline font-bold l">Cart</h1>
      <div className="xl:grid xl:grid-cols-2 xl:gap-[-150px] ">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="mt-3 lg:ml-16 xl:ml-6">
              <div className="w-[300px] overflow-hidden ml-10 cart-item md:w-[650px] md:ml-16 lg:ml-24 xl:ml-0">
                <Card>
                  <div className="cart w-[300px] h-[380px] overflow-hidden md:w-[650px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-image w-[300px] h-[250px] rounded-tr-md rounded-tl-md md:w-[650px]"
                    />

                    <div className="cart-detail mt-3 flex justify-between mx-2">
                      <span>product: {item.title}</span>
                      <span>price: {item.price}</span>
                    </div>

                    <div className="flex justify-between mx-5 mt-4">
                      <span>quantity: {item.quantity}</span>
                      <Button onClick={() => deleteItem(index)}>
                        <span className="text-red-500">Delete product</span>
                      </Button>
                    </div>
                    <div className="text-start ml-5 flex">
                      <Button onClick={() => increaseQuantity(index)}>
                        <span className="text-green-500">+</span>
                      </Button>

                      <div className="ml-6">
                        <Button onClick={() => decreaseQuantity(index)}>
                          <span className="text-red-500">-</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center pt-20 font-semibold text-xl xl:ml-[560px] xl:w-[400px]">
            Your cart is empty. try{" "}
            <Link href={"/"} className="underline">
              Shopping
            </Link>
          </p>
        )}
      </div>

      <div className="text-center border-t-2 border-white mt-10 pt-2 text-2xl h-[32vh]">
        <h2>Total Price: N{totalPrice.toLocaleString()}</h2>
        <div className="mt-3">
          <Button>
            <span className="text-[0.9em]">Proceed to payment</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
