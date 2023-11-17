"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Loader2, PlugZapIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MetaApiForm({ userId, isConnected }) {
  const session = useSession();
  const router = useRouter();
  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    api_key: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const id = uuidv4();

    const formRequestUserAccount = {
      id: id,
      name: name,
      email: email,
    };

    const formRequestBody = {
      id: id,
      ...formData,
      is_connected: true,
    };

    const accountResponse = await fetch("/api/add-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestUserAccount),
    });
    const userAccountData = await accountResponse.json();

    // console.log("Response Data For User Account", userAccountData);

    const response = await fetch("/api/add-meta-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBody),
    });
    const data = await response.json();

    // console.log("Response Data from Meta Account", data);

    setIsLoading(false);
    setFormData({
      email: "",
      password: "",
      api_key: "",
    });

    router.refresh()
  };

  return (
    <div className=" grid gap-6">
      <div className="absolute top-0 right-1  md:top-2  md:right-2 flex items-center space-x-4 py-1 justify-end ">
        <p className="text-md text-gray-900 font-semibold">Account Status: </p>
        <button
          className={`${
            isConnected
              ? "bg-green-500 text-green-100"
              : "bg-rose-200 text-rose-600 hover:bg-rose-500 hover:text-rose-100"
          }  px-2 py-1.5 font-semibold text-base rounded-md `}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
            />
          </div>

          <div className="grid gap-1">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              id="password"
              name="password"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
            />
          </div>

          <div className="grid gap-1">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="api_key"
            >
              Your Api Key
            </label>
            <input
              required
              id="api_key"
              name="api_key"
              placeholder="your-api-key"
              type="text"
              value={formData.api_key}
              onChange={handleChange}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
            />
          </div>

          <button className=" mt-4 flex items-center w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-lg font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <PlugZapIcon strokeWidth={3} className="mr-2 w-4 h-4" />
            Connect your Meta Account
          </button>
        </div>
      </form>
    </div>
  );
}
