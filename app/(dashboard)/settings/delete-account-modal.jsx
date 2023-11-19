"use client";

import React from "react";
import Modal from "../../../components/modal";
import { useState } from "react";
import { auth } from "../../firebase";
import { AtSignIcon, LockIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteAccountModal() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteUserAccount = async (e) => {
    e.preventDefault();

    

    const user = auth.currentUser;

    // const result = await user.

    console.log("user Outside", user);

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
      toast('Deleting Account ...', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      // console.log("everything OK !!!");
      // console.log(email, password);
      // Perform sign-in or other actions here.

      // console.log("user Outside", user);
      // console.log("user email & password", email, password);
      setError({
        emailError,
        passwordError,
      });
    } else {

      toast.error("Wrong Email or Password !!", {
        duration:2000
      })
      setError({
        emailError,
        passwordError,
      });
      return;
    }

    


    const credential = EmailAuthProvider.credential(email, password);

    const accountResponse = await fetch("/api/delete-user-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestUserAccount),
    });
    const userAccountData = await accountResponse.json();

    console.log("Response Data For User Account", userAccountData);

    

    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        deleteUser(user)
          .then(() => {
            // User deleted.
           
            console.log("User account deleted successfully.");
            console.log("Account Deleted!!!!", email);

            toast.success('Account Deleted SuccessFully!!', {
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
              },
              iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
              },
            });
            handleCloseModal();
            signOut({redirect:false}).then(() => router.push('/'));;
          })
          .catch((deleteError) => {
            // An error occurred during account deletion.
            console.error("Error deleting user:", deleteError);
          });
      })
      .catch((reauthError) => {
        // An error occurred during re-authentication.
        toast.error("Error Deleting Account !!", {
          duration:2000
        })
        console.error("Error re-authenticating user:", reauthError);
      });

      const formRequestUserAccount = {
        email: email,
      };
     
  };

  return (
    <div>
      {!showModal && (
        <button
          onClick={handleShowModal}
          className=" flex  cursor-pointer justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
        >
          Delete Account
        </button>
      )}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col space-y-10  px-8  py-4  min-w-[450px] rounded-md bg-white">
            <div className="space-y-6 w-full">
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
                  <div className=" text-sm"></div>
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
            </div>
            <button
              onClick={handleDeleteUserAccount}
              className=" flex w-full  cursor-pointer justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium leading-6 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Yes Delete My Account
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
