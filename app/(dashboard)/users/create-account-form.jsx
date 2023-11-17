"use client";

import React, { useEffect, useState } from "react";
import { getUserData } from "../../../utlis/data";
import Modal from "../../../components/modal";
import { PlusIcon, ServerIcon, ServerOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateAccountForm({ userId, userSubAccounts }) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isServerConnected, setIsServerConnected] = useState(false);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    name: "",
    server: "",
    region: "new-york",
    platform: "mt5",
    type: "cloud-g2",
    magic: 0,
    roles: "",
  });

  const isAllDeployed = userSubAccounts.every(
    (item) =>
      item.state.toLowerCase() === "deployed" &&
      item.connection_status.toLowerCase() === "connected"
  );

  const buttonLabel = isAllDeployed ? "Undeploy" : "Deploy";

  const handleRestartServer = async () => {
    const accountsData = userSubAccounts.map((data) => {
      return {
        accountId: data.account_id,
        state: data.state,
        connectionStatus: data.connection_status,
      };
    });

    const formRequestBodyRedeploy = {
      userId: userId,
      action: isAllDeployed ? "UNDEPLOY" : "DEPLOY",
      accountsData: accountsData,
    };

    // console.log("form Request Body --- >", formRequestBodyRedeploy);
    // console.log("Status is --- >", isAllDeployed);

    const stopServerResponse = await fetch("/api/start-stop-server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBodyRedeploy),
    });
    const stopServerData = await stopServerResponse.json();

    // console.log("Response Data For Stopping Server 1st Time", stopServerData);

    if (stopServerData.status === 200) {
      toast.success(`Server ${buttonLabel} !!`, {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
      });
      router.refresh();
    }

    if (stopServerData.status === 404) {
      router.refresh();
      toast.loading(`Trying to connect to server it  will take some time.`, {
        style: {
          minWidth: "250px",
        },
        duration: 10000,
      });
      toast.loading(`Waiting For Server Connection`, {
        style: {
          minWidth: "250px",
        },
        duration: 10000,
      });
      // Waiting for 3 mins for Server Connection

      await new Promise((resolve) => setTimeout(resolve, 180000));

      // console.log("3 min Completed 1st Time !!!");

      const stopServerResponseTwo = await fetch("/api/start-stop-server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRequestBodyRedeploy),
      });
      const stopServerDataTwo = await stopServerResponseTwo.json();

      // console.log(
      //   "Response Data For Stopping Server 2nd Time",
      //   stopServerDataTwo
      // );

      if (stopServerDataTwo.status === 200) {
        toast.success(`Server ${buttonLabel} !!`, {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
            icon: "🔥",
          },
        });
        router.refresh();
        return;
      } else {
        router.refresh();
        toast.loading(`Trying to connect to server it  will take some time.`, {
          style: {
            minWidth: "250px",
          },
          duration: 10000,
        });
        // Waiting for 3 mins for Server Connection

        await new Promise((resolve) => setTimeout(resolve, 180000));
        // console.log("3 min Completed 2nd Time !!!");

        const stopServerResponseThree = await fetch("/api/start-stop-server", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formRequestBodyRedeploy),
        });
        const stopServerDataThree = await stopServerResponseThree.json();
        // console.log(
        //   "Response Data For Stopping Server 3rd time",
        //   stopServerDataThree
        // );

        if (stopServerDataThree.status === 200) {
          toast.success(`Server Deployed Successfully !!`, {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 5000,
              icon: "🔥",
            },
          });
          router.refresh();
          return;
        } else {
          toast.error(`Server Deploy Failed!!, Please Try Again.`, {
            style: {
              minWidth: "250px",
            },
            duration: 4000,
          });
        }
      }
    }

    if (stopServerData.status === 500) {
      toast.error(`Error !! Connecting to Server`, {
        style: {
          minWidth: "250px",
        },
      });
    }

    router.refresh();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      setFormData({
        ...formData,
        [name]: [value],
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const delayFunction = async (accountId, state, userAccountData) => {
    toast.loading(
      "Waiting For Sever Connection !!",

      {
        style: {
          minWidth: "250px",
        },
        duration: 15000,
      }
    );
    toast.loading(
      "It will take couple of minutes !!",

      {
        style: {
          minWidth: "250px",
        },
        duration: 20000,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 180000));
    // Your asynchronous code here
    // console.log("Async function called after 180 seconds");
    const newUserData = await getUserData(accountId);

    if (newUserData?.data?.length  === 0) {
      toast.loading(
        "Server Connection will take some more time !!",

        {
          style: {
            minWidth: "250px",
          },
          duration: 10000,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 180000));

      const newUserDataTwo = await getUserData(accountId);
      
      const newUserSubAccountDB = {
        accountId: accountId,
        user_id: userId,
        state: state,
        ...userAccountData,
        ...newUserDataTwo.data,
      };
      // console.log(
      //   "New User Sub Account Data with two APIs -->",
      //   newUserSubAccountDB
      // );

      const addSubAccount = await fetch("/api/add-sub-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserSubAccountDB),
      });
      router.refresh();
      return;
    } else {
      const newUserSubAccountDB = {
        accountId: accountId,
        user_id: userId,
        state: state,
        ...userAccountData,
        ...newUserData.data,
      };
      // console.log(
      //   "New User Sub Account Data with two APIs -->",
      //   newUserSubAccountDB
      // );

      const addSubAccount = await fetch("/api/add-sub-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserSubAccountDB),
      });
      router.refresh();
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading(
      "Creating Account !!",

      {
        style: {
          minWidth: "250px",
        },
        duration: 4000,
      }
    );

    const formRequestBody = {
      login: formData.login,
      password: formData.password,
      name: formData.name,
      server: formData.server,
      region: formData.region.length > 0 ? formData.region : "new-york",
      platform: formData.platform.length > 0 ? formData.platform : "mt5",
      type: formData.type.length > 0 ? formData.type : "cloud-g2",
      magic: 0,
      copyFactoryRoles: formData.roles.length > 0 ? [formData.roles] : [""],
    };

    handleCloseModal();
    // console.log("Form Request Body:", formRequestBody);

    const response = await fetch("/api/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBody),
    });

    if (response.ok) {
      // Request was successful

      const accountData = await response.json();
      // toast.promise(
      //   response,
      //   {
      //     loading: 'Loading...',
      //     success: `Account Created Successfully !! `,
      //     error: `Account Creation Failed !!`,
      //   },
      //   {
      //     style: {
      //       minWidth: '250px',
      //     },
      //     success: {
      //       duration: 5000,
      //       icon: '🔥',
      //     },
      //   }
      // );

      const newUserAccountData = {
        password: formRequestBody.password,
        accountType: formRequestBody.type,
        region: formRequestBody.region,
      };

      // console.log(
      //   "Complete Data After Creating and Fetching Account with Copy Factory Role:",
      //   accountData
      // );
      

      toast.success(
        "Account Created Sucessfully !!",

        {
          style: {
            minWidth: "250px",
          },
          duration: 4000,
        }
      );

      delayFunction(
        accountData.accountId,
        accountData.state,
        newUserAccountData
      );

      // toast.promise(
      //   delayFunction,
      //   {
      //     loading: 'Waiting for Server to connect',
      //     success: `Server Connected !! `,
      //     error: `Error Connecting to Server!!`,
      //   },
      //   {
      //     style: {
      //       minWidth: '250px',
      //     },
      //     success: {
      //       duration: 5000,
      //       icon: '🔥',
      //     },
      //   }
      // );
    } else {
      // Request failed
      console.error("Create Account request failed:", response.statusText);
    }
  };

  return (
    <div className="w-full h-full  p-4 ">
      <div className="flex space-x-6">
        <button
          onClick={() => {
            handleRestartServer();
            if (buttonLabel === "Undeploy") {
              toast.promise(
                handleRestartServer(),
                {
                  loading: `${buttonLabel}ing...`,
                  success: `Server ${buttonLabel}ed Successfully !! `,
                  error: `Server ${buttonLabel} Failed !!`,
                },
                {
                  style: {
                    minWidth: "250px",
                  },
                  success: {
                    duration: 5000,
                    icon: "🔥",
                  },
                }
              );
            } else {
              toast(`Waiting For Server Connection....`, {
                style: {
                  minWidth: "250px",
                },
                success: {
                  duration: 15000,
                },
              });
            }
          }}
          className={` ${
            buttonLabel === "Deploy"
              ? "bg-green-100 text-green-600 hover:bg-green-200"
              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
          } flex  items-center cursor-pointer justify-center rounded-md  px-3 py-3 text-base font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  text-md `}
        >
          {buttonLabel === "Deploy" ? (
            <ServerIcon strokeWidth={3} className="mr-2 w-[15px] h-[15px]" />
          ) : (
            <ServerOffIcon strokeWidth={3} className="mr-2 w-[15px] h-[15px]" />
          )}
          {buttonLabel} Servers
        </button>
        <button
          onClick={handleShowModal}
          className=" flex  items-center cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 text-md "
        >
          <PlusIcon strokeWidth={3} className="mr-2 w-[15px] h-[15px]" />
          Add New Account
        </button>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="w-full  overflow-auto sm:overflow-hidden">
            <div className="flex flex-col w-full h-[600px] sm:h-full  overflow-auto sm:overflow-hidden my-16 sm:mt-0 mb-10 sm:mb-0 sm:max-w-[850px] mx-auto bg-white rounded-md px-4 py-2 sm:px-8 sm:py-6  ">
              <h2 className=" text-center text-xl md:text-2xl font-bold  tracking-tight text-gray-900">
                Add New Account
              </h2>

              <form onSubmit={handleSubmit} className="flex  flex-col   mt-6 ">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="mb-4 w-full">
                    <label className="label">
                      Login: <sup className="text-rose-600">*</sup>
                    </label>
                    <input
                      required
                      className="input"
                      type="text"
                      name="login"
                      value={formData.login}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="label">
                      Password: <sup className="text-rose-600">*</sup>
                    </label>
                    <input
                      required
                      className="input"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="label">
                      Name: <sup className="text-rose-600">*</sup>
                    </label>
                    <input
                      required
                      className="input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="label">
                      Server: <sup className="text-rose-600">*</sup>
                    </label>
                    <input
                      className="input"
                      type="text"
                      name="server"
                      value={formData.server}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="label">
                      Platform: <sup className="text-rose-600">*</sup>
                    </label>
                    <select
                      className="select"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="">Choose Platform</option>
                      <option value="mt4">mt4</option>
                      <option value="mt5">mt5</option>
                    </select>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="label">
                      Magic: <sup className="text-rose-600">*</sup>
                    </label>
                    <input
                      required
                      className="input"
                      type="number"
                      name="magic"
                      value={formData.magic}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label className="label">
                      Account Type: <sup className="text-rose-600">*</sup>
                    </label>
                    <select
                      className="select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="">Choose Account Type</option>
                      <option value="cloud-g1">cloud-g1 (General Use)</option>
                      <option value="cloud-g2">
                        cloud-g2 (Cost Optimized)
                      </option>
                    </select>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="label">Select Region:</label>
                    <select
                      className="select"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="">Select Region</option>
                      <option value="new-york">new-york</option>
                      <option value="london">london</option>
                      <option value="singapore">singapore</option>
                      <option value="tokyo">tokyo</option>
                    </select>
                  </div>

                  <div className="mb-4 w-full">
                    <label className="label">Select CopyFactory Role</label>
                    <select
                      className="select"
                      name="roles"
                      value={formData.roles}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="">Select CopyFactory Role</option>
                      <option value="PROVIDER">PROVIDER</option>
                      <option value="SUBSCRIBER">SUBSCRIBER</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex items-center cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 text-md  w-[180px] "
                >
                  Add New Account
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
