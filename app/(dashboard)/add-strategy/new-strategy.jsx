"use client";

import React, { useState } from "react";
import Modal from "../../../components/modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateNewStrategy({userId,providerAccountId}) {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    strategyName: "",
    strategyDescription: "",
    providerAccountId: providerAccountId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubscribeStrategy = async (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted --> ", formData);
  //   const subscriberId = formData.accountId;

  //   const formRequestBody = {
  //     name: "Test-1",
  //     subscriptions: [
  //       {
  //         strategyId: formData.strategyId,
  //         multiplier: 1,
  //       },
  //     ],
  //   };

  //   const res = await fetch(
  //     `/api/subscribe-strategy/?subscriberId=${subscriberId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formRequestBody),
  //     }
  //   );
  //   const data = await res.json();

  //   if (data) {
  //     console.log("Strategy Generated Successfully!!!", data);
  //   }

  //   // setFormData({
  //   //   accountId: "",
  //   //   strategyId: "",
  //   // });
  //   console.log("Subscribed!!!");
  //   handleCloseModal()
  // };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerateStrategy = async (e) => {
    e.preventDefault();

    if (
      !formData.strategyDescription ||
      !formData.strategyName ||
      !formData.providerAccountId
    ) {
      toast.error("Please Provide Complete Details", {
        duration: 4000,
      });
      return;
    }

    const strategyData = {
      userId:userId,
      accountId: formData.providerAccountId,
      strategyName: formData.strategyName,
      strategyDescription: formData.strategyDescription,
      createdAt: new Date()
      
    };
    // console.log("Strategy Data ----> ", strategyData);

    const res = await fetch(`/api/create-strategy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strategyData),
    });

    const data = await res.json();

    if (data) {
      toast.success("New Strategy Genetated !!", {
        duration: 4000,
      });
      // console.log("Strategy Generated Successfully!!!", data);
    }
    // console.log("Form Data ----> ", formData);
    setFormData({
      strategyName: "",
      strategyDescription: "",
      providerAccountId: providerAccountId,
    })
    handleCloseModal();
    router.refresh()
  };

  return (
    <div className=" w-full p-4">
      <div className="flex justify-end space-x-8 ">
        {/* <button
          onClick={handleShowModal}
          className={`flex  cursor-pointer justify-center rounded-md  px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 bg-blue-600 hover:bg-blue-400 `}
        >
          Subscribe Strategy
        </button> */}
        <button
          onClick={handleShowModal}
          className={`flex  cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`}
        >
          Generate New Strategy
        </button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col space-y-8 bg-white w-[500px] rounded-md py-4 px-8">
            <h2 className=" text-center text-xl md:text-2xl font-bold  tracking-tight text-gray-900">
              Generate New Strategy
            </h2>
            <form onSubmit={handleGenerateStrategy} className="flex  flex-col ">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <label className="label" htmlFor="strategyName">
                    Strategy Name
                  </label>
                  <input
                    required
                    id="strategyName"
                    name="strategyName"
                    placeholder="Strategy Name"
                    type="text"
                    value={formData.strategyName}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="grid gap-1">
                  <label className="label" htmlFor="strategyDescription">
                    Strategy Description
                  </label>
                  <input
                    required
                    id="strategyDescription"
                    name="strategyDescription"
                    placeholder="Strategy Description"
                    type="text"
                    value={formData.strategyDescription}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="label" htmlFor="providerAccountId ">
                    Provider Account Id
                  </label>
                  <input
                    required
                    id="providerAccountId"
                    name="providerAccountId"
                    placeholder="Provider Account Id"
                    type="text"
                    value={formData.providerAccountId}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <button
                  disabled={
                    !formData.strategyName ||
                    !formData.strategyDescription ||
                    !formData.providerAccountId
                  }
                  type="submit"
                  className={` flex w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-800 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 `}
                >
                  Generate New Strategy
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

// For Subscribe Strategy

// {showModal && (
//   <Modal onClose={handleCloseModal}>
//     <div className="flex flex-col space-y-2 bg-gray-300 w-[400px] rounded-md p-4">
//       <form onSubmit={handleFormSubmit}>
//         <div className="grid gap-4">
//           <div className="grid gap-1">
//             <label
//               className="text-sm font-medium text-gray-700"
//               htmlFor="accountId"
//             >
//               Subscriber AccountId
//             </label>
//             <input
//               required
//               id="accountId"
//               name="accountId"
//               placeholder="Subscriber AccountId"
//               type="text"
//               value={formData.accountId}
//               onChange={handleChange}
//               className="input"
//             />
//           </div>

//           <div className="grid gap-1">
//             <label
//               className="text-sm font-medium text-gray-700"
//               htmlFor="strategyId"
//             >
//               Strategy Id
//             </label>
//             <input
//               required
//               id="strategyId"
//               name="strategyId"
//               placeholder="Strategy Id"
//               type="text"
//               value={formData.strategyId}
//               onChange={handleChange}
//               className="input"
//             />
//           </div>
//           <button
//             disabled={!formData.strategyId || !formData.accountId}
//             type="submit"
//             className={` flex w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 `}
//           >
//             Subscribe Strategy
//           </button>
//         </div>
//       </form>
//     </div>
//   </Modal>
// )}
