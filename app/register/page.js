"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { UserContext } from "../../components/userContext";
import { getAllUser } from "../../data/user";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setError("Login successful");
        setTimeout(() => setError(""), 3000);
      } else {
        setError(data.message);
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      setError("An error occurred during login.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!regEmail || !regName || !regPhone || !regPassword) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
          bio: "I'm a new user of this amazing website",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setError("Sign up successful - proceed to login page");
        setTimeout(() => setError(""), 3000);
        setIsSignUp(false);
      } else {
        setError("Failed to register");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      setError("Error occurred during sign up");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="bg-main-bg h-[90vh] text-white">
      <div className="pt-20 w-[350px] ml-3 lg:ml-[200px] lg:w-[550px] xl:ml-[480px]">
        <Card>
          <form className="py-5 text-start ">
            {isSignUp ? (
              <div className="signup">
                <h1 className="text-3xl font-bold text-center lg:text-5xl">
                  Sign Up
                </h1>
                <div className="text-start mt-5 mx-5">
                  <label
                    htmlFor="name"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input w-[300px] lg:w-[500px]"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
                <div className="text-start mt-2 mx-5">
                  <label
                    htmlFor="email"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-[300px] lg:w-[500px]"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div className="text-start mt-2 mx-5">
                  <label
                    htmlFor="phone"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Phone:
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="input w-[300px] lg:w-[500px]"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
                <div className="text-start mt-2 mx-5">
                  <label
                    htmlFor="password"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input w-[300px] lg:w-[500px]"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                <div className="mt-10 text-center">
                  <Button onClick={handleSignUp}>
                    <span className="px-5 lg:text-2xl">Sign up</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="login">
                <h1 className="text-3xl font-bold text-center lg:text-5xl">
                  Log In
                </h1>
                <div className="mx-5 mt-5">
                  <label
                    htmlFor="email"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input w-[300px] lg:w-[500px]"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="mx-5 mt-2">
                  <label
                    htmlFor="password"
                    className="text-xl font-bold lg:text-3xl"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input w-[300px] lg:w-[500px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-10 text-center">
                  <Button onClick={handleSignIn}>
                    <span className="px-5 lg:text-2xl">Log in</span>
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-4 text-center lg:text-2xl">
              {isSignUp ? (
                <span>
                  Have an account already?{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => setIsSignUp(false)}
                  >
                    Log in
                  </a>
                </span>
              ) : (
                <span>
                  Don't have an account?{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign up
                  </a>
                </span>
              )}
            </div>
            {error && <p className="mt-3 text-center text-red-600">{error}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
