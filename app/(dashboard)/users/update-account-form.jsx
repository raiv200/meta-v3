"use client";

import React, { useState } from "react";
import { getUserData } from "../../../utlis/data";
import Modal from "../../../components/modal";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpdateAccountForm({
  userId,
  index,
  accountData,
  showModal,
  handleCloseModal,
  handleReDeployServer
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    // login: accountData.login,
    // password: "###########",
    name: accountData?.account_name,
    server: accountData?.server,
    region: accountData?.region,
    platform: accountData?.platform,
    type: accountData?.account_type,
    magic: accountData?.magic,
    roles: accountData?.copy_factory_roles[0],
    balance:accountData?.balance,
    equity:accountData?.equity,
    freeMargin:accountData?.free_margin
  });

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

  // const delayFunction = async (accountId, state, userAccountData) => {
  //   await new Promise((resolve) => setTimeout(resolve, 180000));
  //   // Your asynchronous code here
  //   console.log("Async function called after 180 seconds");
  //   const newUserData = await getUserData(accountId);

  //   const newUserSubAccountDB = {
  //     accountId: accountId,
  //     user_id: userId,
  //     state: state,
  //     ...userAccountData,
  //     ...newUserData.data,
  //   };
  //   console.log(
  //     "New User Sub Account Data with two APIs -->",
  //     newUserSubAccountDB
  //   );

  //   const addSubAccount = await fetch("/api/add-sub-account", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newUserSubAccountDB),
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formRequestBody = {
      // login: formData.login,
      password: accountData?.password,
      accountId: accountData?.account_id,
      name: formData.name,
      server: formData.server,
      region: formData.region.length > 0 ? formData.region : "new-york",
      platform: formData.platform.length > 0 ? formData.platform : "mt5",
      type: formData.type.length > 0 ? formData.type : "cloud-g2",
      magic: 0,
      copyFactoryRoles: formData.roles.length > 0 ? [formData.roles] : [""],
      balance:formData.balance,
      equity:formData.equity,
      freeMargin:formData.freeMargin
    };

    // console.log("Form Request Body:", formRequestBody);

    const response = await fetch("/api/update-sub-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBody),
    });

    const data = await response.json();

    // console.log("Data After Deleting Response from Client---", data);

    handleCloseModal();
    handleReDeployServer(index,accountData?.account_id)
    router.refresh();
  };

  return (
    <>
      {showModal && (
        <div className="w-full h-full  p-4 ">
          {/* <button
        onClick={handleShowModal}
        className=" flex  items-center cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 text-md "
      >
        <PlusIcon strokeWidth={3} className="mr-2 w-[15px] h-[15px]" />
        Add New Account
      </button> */}

          <Modal onClose={handleCloseModal}>
            <div className="w-full  overflow-auto sm:overflow-hidden">
              <div className="w-full h-[600px] sm:h-full  overflow-auto sm:overflow-hidden mt-16 sm:mt-0 mb-10 sm:mb-0 sm:max-w-[850px] mx-auto bg-white rounded-md px-4 py-2 sm:px-8 sm:py-6  ">
                <h2 className=" text-center text-xl md:text-2xl font-bold  tracking-tight text-gray-900">
                  Update Account
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex  flex-col   mt-6 "
                >
                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* <div className="mb-4 w-full">
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
                  </div> */}
                    <div className="mb-4 w-full">
                      <label className="label">
                        Name: <sup className="text-rose-600 font-bold">*</sup>
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
                    Update Account
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
