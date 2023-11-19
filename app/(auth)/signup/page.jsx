"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserIcon, AtSignIcon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    userNameError: false,
    emailError: false,
    passwordError: false,
  });
  // const [passwordAgain, setPasswordAgain] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let userNameError = false;
    let emailError = false;
    let passwordError = false;

    if (!userName || userName.length < 3) {
      userNameError = true;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      emailError = true;
    }

    if (!password || password.length < 8) {
      passwordError = true;
    }

    // console.log("error", error);

    if (!userNameError && !emailError && !passwordError) {
      // console.log("everything OK !!!");
      // console.log(userName, email, password);
      // Perform sign-in or other actions here.

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential && auth.currentUser) {
        try {
          updateProfile(auth.currentUser, {
            displayName: userName,
          });
          // console.log("profile Updated!!");
          // console.log("auth User", auth.currentUser);
        } catch (error) {
          // console.log(error);
        }
      }
      const id = uuidv4();

      const formRequestUserAccount = {
        id: id,
        username: userName,
        email: email,
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
      toast.success("Signup Successful !!", {
        duration:2000
      })
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

    router.push("/signin");
  };

  return (
    <div className="bg-slate-200 grid grid-cols-12 w-full min-h-screen overflow-hidden">
      <div className="bg-gray-100 col-span-12 md:col-span-6 animate-slideLeft transition duration-300 ease-in">
        <div className=" flex min-h-full  flex-col px-4 py-6 md:px-8 md:py-6">
          <div className=" items-center justify-center md:mx-auto md:w-full md:max-w-md py-4 ">
            <p className="  text-sm text-gray-400">
              Already have an Account?{" "}
              <button
                onClick={() => router.push("/signin")}
                className="font-semibold leading-6 text-md text-gray-500 hover:text-gray-400"
              >
                Log In
              </button>
            </p>
          </div>

          <div className="flex flex-1  flex-col items-center justify-center   space-y-4 ">
            <div className="md:mx-auto md:w-full md:max-w-sm">
              <div className="flex flex-col space-y-2.5 items-center justify-center mt-4">
                <h2 className=" text-center text-xl md:text-3xl font-bold  tracking-tight text-gray-900">
                  Create an account
                </h2>
                <p className=" text-center text-xs  font-medium  tracking-tight text-gray-400">
                  Enter your username, email & password to create your account
                </p>
              </div>
            </div>

            <div className="mt-10 w-full md:mx-auto md:w-full md:max-w-md">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="flex relative  mt-2">
                    <input
                      id="username"
                      name="username"
                      placeholder="your username"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      required
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
                    Email address
                  </label>
                  <div className="flex relative  mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                      Password
                    </label>
                  </div>
                  <div className="flex relative  mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="8+ strong character"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 text-md font-semibold px-3  py-3 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                    />
                    <LockIcon className="absolute right-3 top-4 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                {/* <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password Again
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="passwordAgain"
                    name="passwordAgain"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 text-md font-semibold px-2 bg-gray-900/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900  sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

                <div>
                  <button
                    disabled={!email || !password}
                    type="submit"
                    className=" flex w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                  >
                    Create an Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 hidden md:col-span-6 animate-slideTop transition duration-300 ease-in"></div>
    </div>
  );
}
