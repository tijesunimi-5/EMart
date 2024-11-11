"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../components/userContext";
import { getAllUser } from "../../data/user";

const register = () => {
  //This setUser for registration
  const { setUser } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const user = getAllUser();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: userEmail, password: password})
      })
      const data = await res.json();
      if(res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        console.log(data.user)
        setError(<p className="text-xl font-bold text-center text-green-600">login successful</p>);
        setTimeout(() => {
          setError('')
        }, 3000);
      } else {
        setError(data.message);
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    } catch (error) {
      setError(<p className="text-red-600 text-center font-bold text-xl">An error occured</p>);
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    // userName.toLocaleUpperCase();
    // const exisitingUser = user.find((user) => user.userName === userName);

    // if (!exisitingUser) {
    //   setError(
    //     <p className="text-center text-red-600 font-bold">
    //       User not found or Invalid input
    //     </p>
    //   );
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // } else if (exisitingUser.password !== password) {
    //   setError(
    //     <p className="text-center text-red-600 font-bold">Incorrect password</p>
    //   );
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // } else {
    //   setUser(exisitingUser);
    //   setError(
    //     <p className="text-center text-green-600 font-bold">
    //       Sign up successfull
    //     </p>
    //   );
    //   setTimeout(() => {
    //     setError("");
    //   }, 3000);
    // }
  };

  //this function toggles to sign up mode
  const signUp = () => {
    const login = document.querySelector(".login");
    const signUp = document.querySelector(".signup");

    login.style.display = "none";
    signUp.style.display = "block";
  };

  //this function toggles to login mode
  const login = () => {
    const login = document.querySelector(".login");
    const signUp = document.querySelector(".signup");

    login.style.display = "block";
    signUp.style.display = "none";
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();

    if (!regEmail || !regName || !regPhone || !regPassword) {
      setError(
        <p className="text-red-600 text-center font-bold">
          All fields required
        </p>
      );

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Unexpected response:", text);
        throw new Error(`failed to submit: ${response.status}`)
      }

      //check the result if it's submitted successfully
      const result = await response.json();
      console.log("Server response:", result)
      if (result.success) {
        console.log("Data submitted successfully:", result);
        setError(
          <p className="text-xl font-bold text-green-600 text-center">
            Sign up successful - proceed to login page{" "}
          </p>
        );

        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError(
          <p className="font-bold text-red-600 text-center text-xl">
            Failed to register!
          </p>
        );

        setTimeout(() => {
          setError("");
        }, 3000);

        console.log("Failed to register", result.error);
      }
    } catch (error) {
      console.error("Error occured while signing up:", error);
    }
  };

  return (
    <div className="bg-main-bg h-[90vh] text-white">
      <div className="pt-20 w-[350px] ml-3">
        <Card>
          <form className="py-5 text-start ">
            <div className="login ">
              <h1 className="text-3xl font-bold text-center">Log In</h1>
              <div className="mx-5 mt-5">
                <label htmlFor="email" className="text-xl font-bold ">
                  Email:
                </label>{" "}
                <br />
                <input
                  type="email"
                  id="email"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="mx-5 mt-2">
                <label htmlFor="password" className="text-xl font-bold ">
                  Password:
                </label>{" "}
                <br />
                <input
                  type="password"
                  id="password"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-10 text-center">
                <Button onClick={handleSignIn}>
                  <span className="px-5">Log in</span>
                </Button>
              </div>
              {error}

              <div className="mt-4 text-center">
                You don't have an account?{" "}
                <a className="underline" onClick={signUp}>
                  Sign up
                </a>
              </div>
            </div>

            <div className="signup hidden">
              <h1 className="text-3xl font-bold text-center">Sign Up</h1>

              <div className="text-start mt-5 mx-5">
                <label htmlFor="name" className="text-xl font-bold ">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="text-start mt-2 mx-5">
                <label htmlFor="email" className="text-xl font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="text-start mt-2 mx-5">
                <label htmlFor="phone-number" className="text-xl font-bold">
                  Phone:
                </label>
                <input
                  type="number"
                  id="phone-number"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
              </div>

              <div className="text-start mt-2 mx-5">
                <label htmlFor="password" className="text-xl font-bold">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="input w-[300px] xl:border-0 pl-1"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="mt-10 text-center">
                <Button onClick={sumbitHandler}>
                  <span className="px-5">Sign up</span>
                </Button>
              </div>

              {error}

              <div className="mt-4 text-center">
                Have an account already?{" "}
                <a className="underline" onClick={login}>
                  Log in
                </a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default register;
