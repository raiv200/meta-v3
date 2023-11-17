import Link from "next/link";
import React from "react";
import MetaApiForm from "./meta-api-form";
import { AlertTriangleIcon } from "lucide-react";
import { UserIcon, AtSignIcon, LockIcon } from "lucide-react";
import { getUserAccount } from "../../../db/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import DeleteAccountModal from "./delete-account-modal";

// async function fetchUserMetaData(userId) {
//   const getUserMetaData = await getUserMetaAccount(userId);

//   const data = getUserMetaData[0];

//   return data;
// }


export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  // console.log("user email setings -->", email);

  const userAccountData = await getUserAccount(email);
  const userId = userAccountData[0]?.id ? userAccountData[0]?.id : "";
  
  // console.log("User Account Email ", email);
  // console.log("User Account ", userAccountData, userId);

  // const data = await fetchUserMetaData(userId);

  // console.log(data);
  // console.log(data?.id, data?.is_connected);

  return (
    <div className="flex relative flex-col min-h-full justify-between px-4 md:px-10 md:py-6 w-full ">
      <div className="  flex w-full flex-col  space-y-6 md:w-full">
        <div className="flex flex-col  ">
          <h1 className="text-3xl font-bold space-y-2 tracking-tight">
            General Settings
          </h1>
          <p className="text-xs text-gray-500 font-medium px-1">
            Manage your account Settings
          </p>
        </div>
        {/* <MetaApiForm
          userId={data?.id ? data?.id : ""}
          isConnected={data?.is_connected ? data.is_connected : false}
        /> */}
        <div className="flex flex-col space-y-6  md:max-w-4xl md:w-full">
          <p className="text-2xl font-bold space-y-1 tracking-tight">
            Your Profile Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Username
              </label>
              <div className="flex relative  mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userAccountData[0]?.username}
                  readOnly
                  className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                />
                <UserIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Email Address
              </label>
              <div className="flex relative  mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userAccountData[0]?.email}
                  readOnly
                  className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                />
                <AtSignIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your Password
                </label>
              </div>
              <div className="flex relative  mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value="##############"
                  readOnly
                  className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                />
                <LockIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <button className=" flex  disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-4 py-2 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="  ">
       <DeleteAccountModal  />
      </div>
    </div>
  );
}
