"use client";

import React, { useEffect, useState } from "react";
import FormatDateTime from "../../../utlis/formattedDate";
import { MoreHorizontalIcon, RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UpdateAccountForm from "./update-account-form";
import toast from "react-hot-toast";

const allData = [
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45045",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45046",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
  // {
  //   account_id: "8ef0504d-fe2e-415d-bd3d-4df435d1b546",
  //   user_id: "87f7392a-e6b2-4db0-a586-89e8dcf3e8bc",
  //   state: "DEPLOYED",
  //   password: "Kunal@123",
  //   account_type: "cloud-g2",
  //   region: "new-york",
  //   broker: "TradeUltra Limited",
  //   currency: "USD",
  //   server: "TradeUltra-Live",
  //   balance: 3283.79,
  //   equity: 3283.79,
  //   margin: 0,
  //   free_margin: 3283.79,
  //   leverage: 100,
  //   type: "ACCOUNT_TRADE_MODE_REAL",
  //   name: "Kunal Gobindram Kataria",
  //   login: "45047",
  //   credit: 0,
  //   platform: "mt5",
  //   trade_allowed: true,
  //   margin_mode: "ACCOUNT_MARGIN_MODE_RETAIL_HEDGING",
  //   investor_mode: false,
  //   account_currency_exchange_rate: 1,
  //   magic: 0,
  //   account_name: "Test-1",
  //   connection_status: "CONNECTED",
  //   quote_streaming_interval_in_seconds: 2.5,
  //   reliability: "high",
  //   tags: [],
  //   resource_slots: 1,
  //   copy_factory_resource_slots: 1,
  //   version: 5,
  //   hash: 11802,
  //   copy_factory_roles: ["PROVIDER"],
  //   application: "MetaApi",
  //   created_at: "2023-10-19T04:25:23.378Z",
  //   primary_replica: true,
  //   account_replicas: [],
  //   connections: [[Object], [Object], [Object], [Object]],
  // },
];

export default function UserTable({ userId, userSubAccounts }) {
  const router = useRouter();

  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [editBoxPosition, setEditBoxPosition] = useState({ top: 0 });

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    index: 0,
    accountData: userSubAccounts[0],
  });

  const handleCloseModal = () => {
    setShowModal(false);
    router.refresh();
  };

  const handleShowModal = (index, data) => {
    setShowModal(true);
    setOpenRowIndex(null);
    setFormData({
      index:index,
      accountData:data
    })

    // router.refresh();
  };

  const toggleEdit = (e, index) => {
    if (openRowIndex === index) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);

      setOpenRowIndex(index); // Open the edit box for the clicked row
      // Calculate the position relative to the clicked row
      const row = e.target.closest("tr");
      const rowRect = row.getBoundingClientRect();
      setEditBoxPosition({
        top: rowRect.bottom - 8,
      });
    }
  };

  // To Stop the Server
  const handleUnDeployServer = async (index, accountId) => {
    setOpenRowIndex(null);
    const formRequestBodyUndeploy = {
      accountId: accountId,
      newState: "Undeployed",
      connection: "Disconnected",
    };

    const stopServerResponse = await fetch("/api/stop-account-server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBodyUndeploy),
    });
    const stopServerData = await stopServerResponse.json();

    // console.log("Response Data For Stopping Server", stopServerData);

    // console.log("Stopping Server acc with index", index);
    // console.log("account wit id Undeployed, server Stopped!!",accountId);
    setOpenRowIndex(null);
    router.refresh();
  };

  // To Restart The Server

  const handleReDeployServer = async (index, accountId) => {
    setOpenRowIndex(null);
    const formRequestBodyRedeploy = {
      accountId: accountId,
      newState: "Deployed",
      connection: "Connected",
    };

    const startServerResponse = await fetch("/api/start-account-server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBodyRedeploy),
    });
    const startServerData = await startServerResponse.json();
    // console.log("1st Response Data For Starting Server", startServerData);

    if (startServerData.status === 200) {
      toast.success(`Server Deployed SuccessFully!!`, {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 10000,
          icon: "🔥",
        },
      });
      router.refresh();
      return;
    }

    if (startServerData.status === 404) {
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
        duration: 16000,
      });
      // Waiting for 3 mins for Server Connection

      await new Promise((resolve) => setTimeout(resolve, 180000));

      // console.log("3 min Completed 1st Time !!!");
      const startServerResponseTwo = await fetch("/api/start-account-server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRequestBodyRedeploy),
      });
      const startServerDataTwo = await startServerResponseTwo.json();
      // console.log(
      //   "Response Data For Starting Server 2nd Time ",
      //   startServerResponseTwo
      // );

      if (startServerDataTwo.status === 200) {
        toast.success(`Server Deployed SuccessFully !!`, {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 10000,
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

        const startServerResponseThree = await fetch(
          "/api/start-account-server",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formRequestBodyRedeploy),
          } // console.log(
        //   "Response Data For Stopping Server 3rd time",
        //   startServerDataThree
        // );
        );
        const startServerDataThree = await startServerResponseThree.json();
       

        if (startServerDataThree.status == 200) {
          toast.success(`Server Deployed Successfully !!`, {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 10000,
              icon: "🔥",
            },
          });
          router.refresh();
          return;
        } else {
          toast.error(`Server Restart Failed!!, please Try Again.`, {
            style: {
              minWidth: "250px",
            },
            duration: 10000,
          });
        }
      }
    }

    // console.log("Starting Server acc with index", index);
    // console.log("Account with id Redeployed, server Started!!",accountId);
    setOpenRowIndex(null);
    router.refresh();
  };

  const handleDelete = async (index, accountId) => {
    const formRequestBodyDelete = {
      accountId: accountId,
    };

    const deleteResponse = await fetch("/api/delete-sub-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRequestBodyDelete),
    });
    const responseData = await deleteResponse.json();

    // console.log("Response Data After delete Account", responseData);

    // console.log("deleteing acc with index", index);
    // console.log("deleteing acc with accountId", accountId);

    setOpenRowIndex(null);
    router.refresh();
  };

  const handleView = () => {
    setOpenRowIndex(null);
  };
  return (
    <div className="z-0 relative w-full h-full mt-20 px-4 overflow-auto sm:overflow-hidden  border-2 border-blue-500">
      <div className="  w-full sm:max-h-[690px]   custom-scroll  shadow-md ">
        <table className="  w-full  text-sm  text-gray-500   rounded-lg ">
          <thead className=" text-xs text-left text-gray-700  uppercase bg-gray-50 ">
            <tr className="   bg-gray-300">
              <th className="px-2 py-4 ">account_id</th>
              {/* <th className="px-2 py-3 min-w-[200px]">user_id</th> */}
              <th className="px-2 py-4 ">state</th>
              {/* <th className="px-2 py-3">password</th> */}
              {/* <th className="px-2 py-3">account_type</th> */}
              {/* <th className="px-2 py-3">region</th> */}
              {/* <th className="px-2 py-3">broker</th> */}
              {/* <th className="px-2 py-3">currency</th> */}
              {/* <th className="px-2 py-3">server</th> */}
              <th className="px-2 py-4">balance</th>
              {/* <th className="px-2 py-3">equity</th> */}
              {/* <th className="px-2 py-3">margin</th> */}
              {/* <th className="px-2 py-3">free_margin</th> */}
              {/* <th className="px-2 py-3">leverage</th> */}
              {/* <th className="px-2 py-3">type</th> */}
              {/* <th className="px-2 py-3">name</th> */}
              <th className="px-2 py-4">account_name</th>
              <th className="px-2 py-4">login</th>
              {/* <th className="px-2 py-3">credit</th> */}
              {/* <th className="px-2 py-3">platform</th> */}
              <th className="px-2 py-4">trade_allowed</th>
              {/* <th className="px-2 py-3">margin_mode</th> */}
              {/* <th className="px-2 py-3">investor_mode</th> */}
              {/* <th className="px-2 py-3">account_currency_exchange_rate</th> */}
              {/* <th className="px-2 py-3">magic</th> */}
              <th className="px-2 py-4">connection_status</th>
              {/* <th className="px-2 py-3">quote_streaming_interval_in_seconds</th> */}
              {/* <th className="px-2 py-3">reliability</th> */}
              {/* <th className="px-2 py-3">tags</th> */}
              {/* <th className="px-2 py-3">resource_slots</th> */}
              {/* <th className="px-2 py-3">copy_factory_resource_slots</th> */}
              {/* <th className="px-2 py-3">version</th> */}
              {/* <th className="px-2 py-3">hash</th> */}
              <th className="px-2 py-4">copy_factory_roles</th>
              {/* <th className="px-2 py-3">application</th> */}
              {/* <th className="px-2 py-3">created_at</th> */}
              {/* <th scope="col" className="px-2 py-3">
              primary_replica
            </th> */}
              {/* <th scope="col" className="px-2 py-3">
              account_replicas
            </th> */}
              {/* <th scope="col" className="px-2 py-3">
              connections
            </th> */}
              <th className="px-2 py-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {userSubAccounts?.map((data, index) => (
              <tr
                key={data?.login}
                className=" bg-white z-0  border-b font-medium text-gray-900 hover:bg-gray-50"
              >
                <td className="px-2 py-4">{data.account_id}</td>
                {/* <td className="px-2 py-3 ">{data.user_id}</td> */}
                <td className={`px-2 py-4  `}>
                  <span
                    className={`${
                      data.state.toLowerCase() === "deployed"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    } py-1 px-2 rounded-md uppercase`}
                  >
                    {data.state}
                  </span>
                </td>
                {/* <td className="px-2 py-3">{data.password}</td> */}
                {/* <td className="px-2 py-3">{data.account_type}</td> */}
                {/* <td className="px-2 py-3">{data.region}</td> */}
                {/* <td className="px-2 py-3">{data.broker}</td> */}
                {/* <td className="px-2 py-3">{data.currency}</td> */}
                {/* <td className="px-2 py-3">{data.server}</td> */}
                <td className="px-2 py-4">{data.balance}</td>
                {/* <td className="px-2 py-3">{data.equity}</td> */}
                {/* <td className="px-2 py-3">{data.margin}</td> */}
                {/* <td className="px-2 py-3">{data.free_margin}</td> */}
                {/* <td className="px-2 py-3">{data.leverage}</td> */}
                {/* <td className="px-2 py-3">{data.type}</td> */}
                {/* <td className="px-2 py-3">{data.name}</td> */}
                <td className="px-2 py-4">{data.account_name}</td>
                <td className="px-2 py-4">{data.login}</td>
                {/* <td className="px-2 py-3">{data.credit}</td> */}
                {/* <td className="px-2 py-3">{data.platform}</td> */}
                <td className="px-2 py-4">
                  {data.trade_allowed ? "Yes" : "No"}
                </td>
                {/* <td className="px-2 py-3">{data.margin_mode}</td> */}
                {/* <td className="px-2 py-3">
                  {data.investor_mode ? "Yes" : "No"}
                </td> */}
                {/* <td className="px-2 py-3">
                  {data.account_currency_exchange_rate}
                </td> */}
                {/* <td className="px-2 py-3">{data.magic}</td> */}
                <td className="  px-2 py-4">
                  <span
                    className={`${
                      data.connection_status.toLowerCase() === "connected"
                        ? "bg-green-200 text-green-600"
                        : data.connection_status.toLowerCase() === "connecting"
                        ? "bg-amber-200 text-amber-600"
                        : "bg-red-200 text-red-600"
                    } py-1 px-2 rounded-md uppercase`}
                  >
                    {data.connection_status.toLowerCase() === "connecting"
                      ? "Connecting..."
                      : data.connection_status}
                  </span>
                  {/* {data.connection_status.toLowerCase() === "connecting" && (
                  <RefreshCwIcon  className="w-4 h-4 text-gray-900" />
                  )} */}
                </td>
                {/* <td className="px-2 py-3">
                  {data.quote_streaming_interval_in_seconds}
                </td> */}
                {/* <td className="px-2 py-3">{data.reliability}</td> */}
                {/* <td className="px-2 py-3">{data.tags.join(", ")}</td> */}
                {/* <td className="px-2 py-3">{data.resource_slots}</td> */}
                {/* <td className="px-2 py-3">
                  {data.copy_factory_resource_slots}
                </td> */}
                {/* <td className="px-2 py-3">{data.version}</td> */}
                {/* <td className="px-2 py-3">{data.hash}</td> */}
                <td className="px-2 py-4">
                  <span
                    className={`${
                      data.copy_factory_roles[0].toLowerCase() === "subscriber"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-purple-200 text-purple-600"
                    } py-1 px-2 rounded-md`}
                  >
                    {data.copy_factory_roles.join(", ")}
                  </span>
                </td>
                {/* <td className="px-2 py-3">{data.application}</td> */}
                {/* <td className="px-2 py-3">{FormatDateTime(data.created_at)}</td> */}
                {/* <td className="px-2 py-3">
                {data.primary_replica ? "Yes" : "No"}
              </td> */}
                {/* <td className="px-2 py-3">{data.account_replicas.join(", ")}</td> */}
                <td className="relative px-2">
                  <div
                    onClick={(e) => toggleEdit(e, index)}
                    className="flex items-center justify-center cursor-pointer bg-gray-200 rounded-md hover:bg-gray-600 hover:text-white h-8 w-8"
                  >
                    <MoreHorizontalIcon className=" h-6 w-6" />
                  </div>
                  {openRowIndex === index && (
                    <div
                      className={`p-2   top-[20px] right-12 absolute  z-10 bg-gray-200  w-[120px]  rounded-md`}
                    >
                      <button
                        onClick={handleView}
                        className="text-xs w-full text-left font-semibold text-gray-900 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer py-1 px-1.5"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleShowModal(index, data)}
                        className="text-xs w-full text-left font-semibold text-gray-900 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer py-1 px-1.5"
                      >
                        Update Account
                      </button>
                      <button
                        onClick={() =>
                          handleUnDeployServer(index, data.account_id)
                        }
                        className="text-xs w-full text-left font-semibold text-gray-900 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer py-1 px-1.5"
                      >
                        Stop Server
                      </button>
                      <button
                        onClick={() =>
                          handleReDeployServer(index, data.account_id)
                        }
                        className="text-xs w-full text-left font-semibold text-gray-900 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer py-1 px-1.5"
                      >
                        Restart Server
                      </button>
                      <button
                        onClick={() => handleDelete(index, data.account_id)}
                        className=" w-full text-left text-xs font-semibold text-gray-900 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer py-1 px-1.5"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>

                <td className="flex absolute md:top-2 md:right-4">
                  
                  {showModal && <UpdateAccountForm
                    userId={userId}
                    index={formData?.index}
                    accountData={formData?.accountData}
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleReDeployServer={handleReDeployServer}
                  />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
