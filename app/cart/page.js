"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useCart } from "../../components/cartContext";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import useTracker from "../../lib/useTracker";

const CartPage = () => {
  const { trackEvent } = useTracker("cart page");
  const { cart, setCart } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [newItemId, setNewItemId] = useState("");
  const [loading, setLoading] = useState(false);
  const previousCartIds = useRef([]); // Track previous cart IDs
  const isFetching = useRef(false); // Track if fetch is in progress

  const fetchRecommendationsDebounced = useCallback(() => {
    let timeoutId;
    return async () => {
      if (isFetching.current) return;
      clearTimeout(timeoutId); // Clear any existing timeout
      timeoutId = setTimeout(async () => {
        isFetching.current = true;
        setLoading(true);
        try {
          console.log(
            "Sending userItems:",
            cart.map((item) => item.id)
          );
          const response = await fetch("/api/recommendationAPI", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userItems: cart.map((item) => item.id) }),
          });
          if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
            } catch (jsonError) {
              console.error("Failed to parse error response:", jsonError);
            }
            throw new Error(errorMessage);
          }
          const data = await response.json();
          console.log("Received recommendations:", data.recommendations);
          setRecommendations(data.recommendations || []);
          setError(null);
        } catch (err) {
          console.error("Recommendation fetch error:", err.message);
          setError("Unable to load recommendations: " + err.message);
          setRecommendations([]);
        } finally {
          setLoading(false);
          isFetching.current = false;
        }
      }, 2000); // Delay to debounce and allow backend updates
    };
  }, [cart]);

  useEffect(() => {
    const currentCartIds = cart.map((item) => item.id);
    const newItemAdded =
      currentCartIds.length > previousCartIds.current.length &&
      currentCartIds.some((id) => !previousCartIds.current.includes(id));

    if (cart.length > 0 && newItemAdded) {
      fetchRecommendationsDebounced()();
    }

    previousCartIds.current = currentCartIds;
  }, [cart, fetchRecommendationsDebounced]);

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user1", productId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! Status: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Add to cart response:", data);

      const productResponse = await fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!productResponse.ok) throw new Error("Product not found");
      const product = await productResponse.json();
      setCart([...cart, { ...product, quantity: 1 }]);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
      setError("Failed to add item to cart: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + convertPriceToInt(item.price) * item.quantity,
      0
    );
    try {
      await trackEvent("purchase", { items: cart, total });
      setCart([]);
      alert("Purchase successful!");
    } catch (err) {
      console.error("Checkout tracking error:", err);
      alert("Purchase completed, but tracking failed.");
    }
  };

  const convertPriceToInt = (price) => {
    try {
      if (typeof price === "number") {
        return price;
      }
      if (typeof price === "string") {
        const cleanPrice = price.replace("N", "").trim();
        if (cleanPrice.includes("k")) {
          return parseInt(cleanPrice.replace("k", "")) * 1000;
        } else if (cleanPrice.includes("M")) {
          return parseFloat(cleanPrice.replace("M", "")) * 1000000;
        } else {
          return parseInt(cleanPrice);
        }
      }
      return 0;
    } catch (err) {
      console.error(`Invalid price format: ${price}`, err);
      return 0;
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = convertPriceToInt(item.price);
    return sum + itemPrice * item.quantity;
  }, 0);

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const deleteItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="relative pt-14 bg-main-bg text-white overflow-hidden min-h-screen">
      <h1 className="text-4xl text-center underline font-bold">Cart</h1>
      {cart.length > 0 ? (
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 p-4">
          {cart.map((item, index) => (
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
                      <span>Product: {item.title}</span>
                      <span>Price: {item.price}</span>
                    </div>
                    <div className="flex justify-between mx-5 mt-4">
                      <span>Quantity: {item.quantity}</span>
                      <Button onClick={() => deleteItem(index)}>
                        <span className="text-red-500">Delete Product</span>
                      </Button>
                    </div>
                    <div className="text-start ml-5 flex mt-2">
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
          ))}
          <div className="mt-6 p-4">
            <h2 className="text-2xl font-semibold">Recommended Products</h2>
            {loading ? (
              <p>Loading recommendations...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((item) => (
                  <Card key={item.id} className="w-[300px]">
                    <div className="w-[300px] h-[450px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[300px] h-[250px] rounded-tr-md rounded-tl-md"
                      />
                      <div className="cart-detail mt-3 mx-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p>Price: N{item.price.toLocaleString()}</p>
                        <p>
                          Description:{" "}
                          {item.description !== undefined
                            ? item.description
                            : "No description available"}
                        </p>
                        <div>
                          <h4 className="font-medium">Specifications:</h4>
                          {Array.isArray(item.spec) && item.spec.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm">
                              {item.spec.map((spec, index) => (
                                <li key={index}>{spec}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>No specifications available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center pt-20 font-semibold text-xl xl:ml-[560px] xl:w-[400px]">
          <p>
            Your cart is empty. Try{" "}
            <Link href={"/"} className="underline">
              Shopping
            </Link>
          </p>
          <div className="mt-4">
            <input
              type="text"
              value={newItemId}
              onChange={(e) => setNewItemId(e.target.value)}
              placeholder="Enter product ID (e.g., 12)"
              className="p-2 text-black rounded"
            />
            <Button onClick={() => addToCart(newItemId)} className="ml-2">
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      )}
      <div className="text-center border-t-2 border-white mt-10 pt-2 text-2xl">
        <h2>Total Price: N{totalPrice.toLocaleString()}</h2>
        <div className="mt-3">
          <Button onClick={handleCheckout}>
            <span className="text-[0.9em]">Checkout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
