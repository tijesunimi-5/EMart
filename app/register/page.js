'use client'
import Button from '@/components/Button';
import Card from '@/components/Card'
import Link from 'next/link';
import React from 'react'

const register = () => {
  //this function toggles to sign up mode
  const signUp = () => {
    const login = document.querySelector('.login');
    const signUp = document.querySelector('.signup');

    login.style.display = 'none';
    signUp.style.display = 'block'
  }

  //this function toggles to login mode
  const login = () => {
    const login = document.querySelector(".login");
    const signUp = document.querySelector(".signup");

    login.style.display = "block";
    signUp.style.display = "none";
  }

  return (
    <div className="bg-main-bg h-[90vh] text-white">
      <div className="pt-20 w-[350px] ml-3">
        <Card>
          <form className="py-5 text-start ">
            <div className="login hidden">
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
                />
              </div>

              <div className="mt-10 text-center">
                <Button>
                  <span className="px-5">Log in</span>
                </Button>
              </div>

              <div className="mt-4 text-center">
                You don't have an account?{" "}
                <a className="underline" onClick={signUp}>Sign up</a>
              </div>
            </div>

            <div className="signup">
              <h1 className="text-3xl font-bold text-center">Sign Up</h1>

              <div className="text-start mt-5 mx-5">
                <label htmlFor="name" className="text-xl font-bold ">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="input w-[300px] xl:border-0 pl-1"
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
                />
              </div>

              <div className="mt-10 text-center">
                <Button>
                  <span className="px-5">Sign up</span>
                </Button>
              </div>

              <div className="mt-4 text-center">
                Have an account already?{" "}
                <a className="underline" onClick={login}>Log in</a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default register
