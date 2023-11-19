"use client";

import { HomeIcon, AtSignIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LogInPage() {
  const router = useRouter();

  const session = useSession();

  // if (!session) {
  //   router.push('/')
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let emailError = false;
    let passwordError = false;

    if (!email || !email.includes("@") || !email.includes(".")) {
      emailError = true;
    }

    if (!password || password.length < 8) {
      passwordError = true;
    }

    // console.log("error", error);

    if (!emailError && !passwordError) {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.ok) {
        router.push("/dashboard/live");
        toast.success("Login Successful !!", {
          duration: 4000,
        });

        toast.success("Welcome Back !!", {
          duration: 4000,
        });
      } else {
        router.push("/error");
        toast.error("Wrong Email or Password !!", {
          duration: 4000,
        });
      }
    } else {
      toast.error("Wrong Email or Password !!", {
        duration: 4000,
      });
      setError({
        emailError,
        passwordError,
      });
      return;
    }
  };

  // const handleSignIn = () => {};

  useEffect(() => {
    // console.log("Updated error state: ", error);
  }, [error]);

  return (
    <div className="bg-slate-200 grid grid-cols-12 w-full min-h-screen overflow-hidden ">
      <div className="bg-gray-100 col-span-12  md:col-span-6 animate-slideLeft transition duration-300 ease-in">
        <div className="  flex min-h-full  flex-col px-4 py-6 md:px-8 md:py-6">
          <div className=" items-center justify-center md:mx-auto md:w-full md:max-w-md py-4">
            <p className="  text-sm text-gray-400">
              Not a member?{" "}
              <button
                onClick={() => router.push("signup")}
                className="font-semibold leading-6 text-md text-gray-500 hover:text-gray-400"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="flex flex-1  flex-col items-center justify-center   space-y-4 ">
            <div className="flex  flex-col items-center justify-center md:mx-auto md:w-full md:max-w-md ">
              {/* <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              /> */}
              <div className="flex items-center justify-center bg-gray-900 rounded-lg p-2 w-10 h-10">
                <Link href="/">
                  <HomeIcon className="h-6 w-6 text-gray-200" />
                </Link>
              </div>
              <div className="flex flex-col space-y-2.5 items-center justify-center mt-4">
                <h2 className=" text-center text-xl md:text-3xl font-bold  tracking-tight text-gray-900">
                  Welcome back
                </h2>
                <p className=" text-center text-xs font-medium  tracking-tight text-gray-400">
                  Enter your email & password to Log In to your account
                </p>
              </div>
            </div>

            <div className="mt-10 w-full md:mx-auto md:w-full md:max-w-md">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="flex relative   mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-0 block w-full rounded-md  text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                    />

                    <AtSignIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
                    {error.emailError && (
                      <p className="text-xs text-red-500 font-semibold absolute -bottom-4 left-0">
                        Please enter a valid Email Id
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className=" text-sm">
                      <div
                        onClick={() => router.push("/forgot-password")}
                        className="cursor-pointer font-semibold text-gray-500 hover:text-gray-400"
                      >
                        Forgot password?
                      </div>
                    </div>
                  </div>
                  <div className="flex relative  mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="8+ strong characters"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      min={8}
                      className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                    />
                    <LockIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
                    {error.passwordError && (
                      <p className="text-xs text-red-500 font-semibold absolute -bottom-4 left-0">
                        Password should be 8 characters or long
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!email || !password}
                    className="flex  w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex bg-slate-200 col-span-6 animate-slideTop transition duration-300 ease-in"></div>
    </div>
  );
}
