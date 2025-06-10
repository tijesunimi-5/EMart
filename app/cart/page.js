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

  // Function to fetch random recommendation for empty cart
  const fetchRandomRecommendation = async () => {
    setLoading(true);
    try {
      console.log("Fetching random recommendation for empty cart...");
      const response = await fetch("/api/recommendationAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userItems: [] }), // Empty array for random recommendation
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
      console.log("Received random recommendations:", data.recommendations);
      setRecommendations(data.recommendations || []);
      setError(null);
    } catch (err) {
      console.error("Random recommendation fetch error:", err.message);
      setError("Unable to load random recommendation: " + err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch random recommendation when cart becomes empty
    if (cart.length === 0 && previousCartIds.current.length > 0) {
      fetchRandomRecommendation();
    }
    previousCartIds.current = cart.map((item) => item.id);
  }, [cart]);

  return (
    <section className="h-[100%] bg-main-bg w-[100%]">
      {cart.length > 0 ? (
        <div className="ml-3 pt-20">
          {cart.map((item, idx) => (
            <Card key={item.id} styles={"relative w-[350px]"}>
              <div className="relative">
                <img src={item.image} className="w-[350px]" />
                <p className="absolute top-0 rounded-bl-lg bg-black right-0 px-2 py-1">
                  {item.availability}
                </p>
                <p className="bg-black absolute bottom-0 rounded-tr-lg price px-2 py-1 font-bold tracking-wider">
                  N{item.price.toLocaleString()}
                </p>
              </div>
              <div className="other_content flex flex-col justify-start items-start px-2 pt-4">
                <h2 className="text-start font-bold text-[1.5em] pb-3">
                  {item.title}
                </h2>
                <p className="text-start text-[18px]">{item.description}</p>

                <div className="specs mt-5 text-start">
                  <h3 className="font-bold text-[1.2em] scale-y-110 pb-2">
                    Specifications:
                  </h3>
                  {item.spec.map((specs) => (
                    <p className="leading-6 text-[17px]">• {specs}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 mb-3 w-full">
                  <Button
                    styles={"text-center px-5 border-red-500"}
                    onClick={() => deleteItem(idx)}
                  >
                    Delete Item
                  </Button>

                  <div className="flex justify-between w-[100px]">
                    <Button
                      styles={"border-green-500"}
                      onClick={() => increaseQuantity(idx)}
                    >
                      +
                    </Button>
                    <Button
                      styles={"border-red-500 border-2 font-bold text-[18px]"}
                      onClick={() => decreaseQuantity(idx)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {/* // Recommendations Section */}
          <div className="mt-8 text-white">
            <h2 className="text-[1.6em] font-bold text-white">
              Recommended Products
            </h2>
            {loading ? (
              <p>Loading recommendations...</p>
            ) : error ? (
              <p>{error}</p>
            ) : recommendations.length > 0 ? (
              <div>
                {recommendations.map((item) => (
                  <Card key={item.id} styles={"w-[350px]"}>
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[350px] rounded-tr-md rounded-tl-md"
                      />
                      <p className="absolute bottom-0 rounded-tr-lg">
                        Price: N{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="cart-detail mt-3 mx-2">
                      <h3 className="text-start font-bold text-[1.5em] pb-3">
                        {item.title}
                      </h3>

                      <p className="text-start text-[18px]">
                        Description:{" "}
                        {item.description !== undefined
                          ? item.description
                          : "No description available"}
                      </p>
                      <div className="specs mt-5 text-start">
                        <h4 className="font-bold text-[1.2em] scale-y-110 pb-2">
                          Specifications:
                        </h4>
                        {Array.isArray(item.spec) && item.spec.length > 0 ? (
                          <ul className="list-disc pl-5 text-sm pb-7">
                            {item.spec.map((spec, index) => (
                              <li key={index} className="leading-6 text-[17px]">
                                {spec}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No specifications available.</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>

          {/* Total Price */}
          <div className="text-center border-t-2 border-white pb-10 mt-10 pt-2 text-2xl text-white font-bold w-[350px]">
            <h2>Total Price: N{totalPrice.toLocaleString()}</h2>
            <div className="mt-3">
              <Button onClick={handleCheckout}>
                <span className="text-[0.9em]">Checkout</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100vh] bg-main-bg flex justify-center items-center text-white">
          <div>
            <p className="font-bold text-2xl">Your cart is empty</p>
            {loading ? (
              <p>Loading random recommendation...</p>
            ) : error ? (
              <p>{error}</p>
            ) : recommendations.length > 0 && recommendations[0].consequents ? (
              <div className="mt-4">
                <Card styles={"w-[350px]"}>
                  <div className="relative">
                    <img
                      src={recommendations[0].consequents[0].image}
                      alt={recommendations[0].consequents[0].title}
                      className="w-[350px] rounded-tr-md rounded-tl-md"
                    />
                    <p className="absolute bottom-0 rounded-tr-lg">
                      Price: N
                      {recommendations[0].consequents[0].price.toLocaleString()}
                    </p>
                  </div>
                  <div className="cart-detail mt-3 mx-2">
                    <h3 className="text-start font-bold text-[1.5em] pb-3">
                      {recommendations[0].consequents[0].title}
                    </h3>
                    <p className="text-start text-[18px]">
                      Description:{" "}
                      {recommendations[0].consequents[0].description ||
                        "No description available"}
                    </p>
                    <div className="specs mt-5 text-start">
                      <h4 className="font-bold text-[1.2em] scale-y-110 pb-2">
                        Specifications:
                      </h4>
                      {recommendations[0].consequents[0].spec &&
                      recommendations[0].consequents[0].spec.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm pb-7">
                          {recommendations[0].consequents[0].spec.map(
                            (spec, index) => (
                              <li key={index} className="leading-6 text-[17px]">
                                {spec}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>No specifications available.</p>
                      )}
                    </div>
                  </div>
                  <Button
                    styles={"mt-4 w-full"}
                    onClick={() =>
                      addToCart(recommendations[0].consequents[0].id)
                    }
                  >
                    Add to Cart
                  </Button>
                </Card>
              </div>
            ) : (
              <p>No recommendations available.</p>
            )}
            <p></p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
