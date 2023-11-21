"use client";

import {
  AlignHorizontalDistributeCenterIcon,
  CopyIcon,
  FileEditIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import Modal from "../../../components/modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function StrategyCard({
  providerAccountId,
  strategyId,
  strategyName,
  strategyDescription,
}) {
  const router = useRouter();

  const [showUpdateStrategyModal, setShowUpdateStrategyModal] = useState(false);
  const [showDeleteStrategyModal, setShowDeleteStrategyModal] = useState(false);
  const [formData, setFormData] = useState({
    strategyName: strategyName,
    strategyDescription: strategyDescription,
    providerAccountId: providerAccountId,
  });

  const [subscriberId, setSubscriberId] = useState("");
  const [showSubscriberModal, setShowSubscriberModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowSubscriberModal = () => {
    setShowSubscriberModal(true);
  };
  const handleCloseSubscriberModal = () => {
    setShowSubscriberModal(false);
  };

  const handleOpenUpdateModal = () => {
    setShowUpdateStrategyModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateStrategyModal(false);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteStrategyModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteStrategyModal(false);
  };

  const handleUpdateStrategy = async (e, strategyId) => {
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
      strategyId: strategyId,
      strategyName: formData.strategyName,
      strategyDescription: formData.strategyDescription,
      accountId: formData.providerAccountId,
    };
    // console.log("Strategy Data ----> ", strategyData);

    const res = await fetch(`/api/update-strategy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strategyData),
    });

    const data = await res.json();

    if (data) {
      toast.success("Strategy  Updated !!", {
        duration: 4000,
      });
      // console.log("Strategy Updated Successfully!!!", data);
    }

    handleCloseUpdateModal();
    router.refresh();

    // console.log("Strategy Updated !!!", strategyId);
  };

  const handleDeleteStrategy = async (strategyId) => {
    const deleteData = {
      strategyId: strategyId,
    };
    const res = await fetch(`/api/delete-strategy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    });

    const data = await res.json();

    // console.log("Strategy Deleted Successfully!!!", data);

    if (data.status === 200) {
      toast.success("Strategy  Deleted Successfully !!", {
        duration: 4000,
      });
      // console.log("Strategy Deleted Successfully!!!", data);
      // console.log("Strategy Deleted !!!", strategyId);
    } else {
      toast.error("Strategy  Deleted Failed !!", {
        duration: 4000,
      });
    }

    handleCloseDeleteModal();
    router.refresh();
  };

  const handleSubscribeStrategy = async (strategyId) => {
    const subId = subscriberId;

    console.log("sub Id", subId);
    console.log("Strategy  Id", strategyId);

    const formRequestBody = {
      name: "Test-1",
      subscriptions: [
        {
          strategyId: strategyId,
          multiplier: 1,
          symbolMapping:[
            {
              to:"GOLD",
              from:'XAUUSD'
            },
            {
              to:"SILVER",
              from:'XAGUSD'
            },
            {
              to:"GBPUSD",
              from:'GBPUSD'
            },
            {
              to:"EURUSD",
              from:'EURUSD'
            },
            {
              to:"USDJPY",
              from:'USDJPY'
            },
  
          ],
          tradeSizeScaling: {
            mode: "none"
          },
        },
        
      ],
    };

    console.log(formRequestBody)

    const res = await fetch(
      `/api/subscribe-strategy/?subscriberId=${subscriberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRequestBody),
      }
    );
    const data = await res.json();

    if (data) {
      console.log("Strategy Subscribed  Successfully!!!", data);
      toast.success("Strategy Subscribed  Successfully!! !!", {
        duration: 6000,
      });
    }

    setSubscriberId("");
    handleCloseSubscriberModal();
  };

  return (
    <>
      {showUpdateStrategyModal && (
        <Modal onClose={handleCloseUpdateModal}>
          {" "}
          <div className="flex flex-col space-y-8 bg-white w-[500px] rounded-md py-4 px-8">
            <h2 className=" text-center text-xl md:text-2xl font-bold  tracking-tight text-gray-900">
              Update Strategy
            </h2>
            <form
              onSubmit={(e) => handleUpdateStrategy(e, strategyId)}
              className="flex  flex-col "
            >
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
                  <label className="label" htmlFor="providerAccountId">
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
                  Update Strategy
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {showDeleteStrategyModal && (
        <Modal onClose={handleCloseDeleteModal}>
          {" "}
          <div className="flex flex-col space-y-8 bg-white w-[500px] rounded-md py-6 px-8">
            <div className="flex  flex-col space-y-6 ">
              <div className="flex flex-col space-y-1">
                <h3 className="text-gray-900 text-lg font-semibold">
                  Are you absolutely sure?
                </h3>
                <p className="text-gray-600 text-sm font-normal">
                  This action cannot be undone. This will permanently delete
                  your strategy and remove all sunscribers.
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseDeleteModal}
                  type="button"
                  className={` flex border-[1px] border-gray-300 cursor-pointer justify-center rounded-md bg-white px-6 py-2 text-base font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 `}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteStrategy(strategyId)}
                  type="button"
                  className={` flex  disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-rose-600 px-6 py-2 text-base font-semibold leading-6 text-rose-100 shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 `}
                >
                  Delete Strategy
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* For Subscribe Strategy */}

      {showSubscriberModal && (
        <Modal onClose={handleCloseSubscriberModal}>
          <div className="flex flex-col space-y-2 bg-gray-300 w-[400px] rounded-md p-4">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="accountId"
                >
                  Subscriber AccountId
                </label>
                <input
                  required
                  id="accountId"
                  name="accountId"
                  placeholder="Subscriber AccountId"
                  type="text"
                  value={subscriberId}
                  onChange={(e) => setSubscriberId(e.target.value)}
                  className="input"
                />
              </div>
              <button
                disabled={!subscriberId}
                onClick={() => handleSubscribeStrategy(strategyId)}
                className={` flex w-full disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-gray-900 px-3 py-3 text-base font-semibold leading-6 text-gray-100 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 `}
              >
                Subscribe Strategy
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="relative rounded-md flex flex-col justify-center min-h-[160px] space-y-4 px-4  border-2">
        <div className="flex items-center justify-between space-x-6">
          {/* Account Id  */}

          <div className="flex flex-1 items-center space-x-2 ">
            <p>ID:</p>
            <div className="flex items-center justify-between p-1  w-full rounded-md space-x-4 border-2 border-dashed">
              <span>{strategyId}</span>
              <CopyIcon className="h-5 w-5 text-gray-900" />
            </div>
          </div>

          {/* Edit Delete Button  */}
          <div className="flex  space-x-2">
            <button onClick={handleOpenUpdateModal} className="cursor-pointer">
              <FileEditIcon className="h-5 w-5  text-gray-900" />
            </button>
            <button onClick={handleOpenDeleteModal} className="cursor-pointer">
              <TrashIcon className="h-5 w-5  text-gray-900" />
            </button>
          </div>
        </div>

        {/* Account Name  */}
        <div className="flex items-center space-x-4 ">
          <div className="flex items-center space-x-2">
            <AlignHorizontalDistributeCenterIcon className="h-4 w-4 text-gray-900 " />
            <p className="text-md font-medium capitalize text-gray-700">
              {strategyName}
            </p>
          </div>
        </div>

        <div className="flex  ">
          <p className="text-md font-medium capitalize text-gray-700">
            {strategyDescription}
          </p>
        </div>

        <div className="absolute bottom-2 right-2">
          <button
            onClick={handleShowSubscriberModal}
            className={`flex cursor-pointer justify-center rounded-md  px-4 py-1 text-sm font-semibold leading-6 text-gray-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 bg-blue-600 hover:bg-blue-400 `}
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="w-full sm:w-1/2 lg:w-1/3 h-[200px] px-4 mb-4 ">
      <div className="bg-gray-200 w-full h-full rounded-md p-2"></div>
</div> */
}
