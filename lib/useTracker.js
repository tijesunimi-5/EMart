"use client";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export default function useTracker(page) {
  const [userId, setUserId] = useState(null);
  const entryTimeRef = useRef(0);
  const hasTrackedEntry = useRef(false); // Prevent duplicate tracking

  // Format time as hr:min:sec
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    // Get or create user ID
    let uid = Cookies.get("userId");
    if (!uid) {
      uid = uuidv4();
      Cookies.set("userId", uid, { expires: 365 });
    }
    setUserId(uid);

    // Track page entry (run once)
    if (!hasTrackedEntry.current) {
      hasTrackedEntry.current = true;
      entryTimeRef.current = Date.now();
      const timeEntered = formatTime(new Date());
      fetch("/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "page_enter",
          userId: uid,
          page,
          timeEntered,
        }),
      }).catch((error) => console.error("Failed to track entry:", error));
    }

    // Track page exit
    function handleExit() {
      const exitTime = Date.now();
      const duration = Math.round((exitTime - entryTimeRef.current) / 1000);
      const timeLeft = formatTime(new Date());
      const payload = JSON.stringify({
        type: "page_exit",
        userId: uid,
        page,
        timeLeft,
        duration,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/tracker", payload);
      } else {
        fetch("/api/tracker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch((error) => console.error("Failed to track exit:", error));
      }
    }

    window.addEventListener("beforeunload", handleExit);
    return () => {
      handleExit(); // Handle navigation
      window.removeEventListener("beforeunload", handleExit);
    };
  }, [page]);

  // Function to track adding a product to cart
  function addCart(product) {
    if (!userId) return;
    fetch("/api/tracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "add_to_cart",
        userId,
        page,
        product,
      }),
    }).catch((error) => console.error("Failed to track cart addition:", error));
  }

  return { userId, addCart };
}
