"use client";
import Button from "../../components/Button";
import Card from "../../components/Card";
import React, { useContext, useState } from "react";
import { UserContext } from "../../components/userContext";
import { useRouter } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!userEmail || !password) {
      setError("Email and password are required");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
      return;
    }
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
        console.log(data.user)
        setError("Login successful");
        setTimeout(() => setError(""), 3000);
        router.push('/')
        setIsLoading(false);
      } else {
        setError(data.message);
        setTimeout(() => setError(""), 3000);
        setIsLoading(false)
      }
    } catch (error) {
      setError("An error occurred during login.");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!regEmail || !regName || !regPhone || !regPassword) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
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
        setIsLoading(false);
        setError("Sign up successful - proceed to login page");
        setTimeout(() => setError(""), 3000);
        setIsSignUp(false);
      } else {
        setError("Failed to register");
        setTimeout(() => setError(""), 3000);
        setIsLoading(false);
      }
    } catch (error) {
      setError("Error occurred during sign up");
      setTimeout(() => setError(""), 3000);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-main-bg h-[100vh] text-white">
      <div className="pt-20 w-[350px] ml-3 lg:ml-[200px] lg:w-[550px] xl:ml-[480px]">
        <Card>
          <form className="py-5 text-start ">
            {isSignUp ? (
              <div className="signup">
                <h1 className="text-3xl font-bold text-center lg:text-5xl">
                  Sign Up
                </h1>
                <div className="wave-group mt-5 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      N
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      a
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      m
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      e
                    </span>
                  </label>
                </div>
                <div className="wave-group mt-5 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      E
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      m
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      a
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      i
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      l
                    </span>
                  </label>
                </div>
                <div className="wave-group mt-5 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      p
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      h
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      o
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      n
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      e
                    </span>
                  </label>
                </div>
                <div className="wave-group mt-5 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      P
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      a
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      s
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      s
                    </span>
                    <span className="label-char" style={{ "--index": 4 }}>
                      w
                    </span>
                    <span className="label-char" style={{ "--index": 5 }}>
                      o
                    </span>
                    <span className="label-char" style={{ "--index": 6 }}>
                      r
                    </span>
                    <span className="label-char" style={{ "--index": 7 }}>
                      d
                    </span>
                  </label>
                </div>
                <p className="mx-5 mt-3">
                  Have an account already?{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => setIsSignUp(false)}
                  >
                    Log in
                  </a>
                </p>
                <div className="mt-5 text-center">
                  <Button
                    styles={"border-white border w-[150px] py-2"}
                    onClick={handleSignUp}
                  >
                    <span className="px-5 lg:text-2xl">Sign up</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="login">
                <h1 className="text-3xl font-bold text-center lg:text-5xl">
                  Log In
                </h1>
                <div className="wave-group my-5 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      E
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      m
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      a
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      i
                    </span>
                    <span className="label-char" style={{ "--index": 4 }}>
                      l
                    </span>
                  </label>
                </div>
                <div className="wave-group mt-7 mx-5">
                  <input
                    required
                    type="text"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ "--index": 0 }}>
                      P
                    </span>
                    <span className="label-char" style={{ "--index": 1 }}>
                      a
                    </span>
                    <span className="label-char" style={{ "--index": 2 }}>
                      s
                    </span>
                    <span className="label-char" style={{ "--index": 3 }}>
                      s
                    </span>
                    <span className="label-char" style={{ "--index": 4 }}>
                      w
                    </span>
                    <span className="label-char" style={{ "--index": 5 }}>
                      o
                    </span>
                    <span className="label-char" style={{ "--index": 6 }}>
                      r
                    </span>
                    <span className="label-char" style={{ "--index": 7 }}>
                      d
                    </span>
                  </label>
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
                <></>
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
            {error && <p className="mt-3 text-center text-blue-600">{error}</p>}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
