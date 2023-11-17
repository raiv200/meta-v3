"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderPlacementForm() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("MARKET");
  const [actionType, setAcionType] = useState("");
  const [formData, setFormData] = useState({
    orderType: "", // Add orderType field
    symbol: "",
    volume: 0,
    openPrice: 0,
    takeProfit: 0,
    stopLoss: 0,
    stopLimitPrice: "",
  });

  const symbolOptions = ["GBPUSD", "EURUSDm", "CADJPYm", "AUDUSDm", "USDCAD"]; // Example symbol options

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (actionType === "BUY") {
      if (activeTab === "LIMIT") {
        formData.orderType = "ORDER_TYPE_BUY_LIMIT";
      } else if (activeTab === "STOP") {
        formData.orderType = "ORDER_TYPE_BUY_STOP";
      } else if (activeTab === "STOP_LIMIT") {
        formData.orderType = "ORDER_TYPE_BUY_STOP_LIMIT";
      } else {
        formData.orderType = "ORDER_TYPE_BUY";
      }
    } else if (actionType === "SELL") {
      if (activeTab === "LIMIT") {
        formData.orderType = "ORDER_TYPE_SELL_LIMIT";
      } else if (activeTab === "STOP") {
        formData.orderType = "ORDER_TYPE_SELL_STOP";
      } else if (activeTab === "STOP_LIMIT") {
        formData.orderType = "ORDER_TYPE_SELL_STOP_LIMIT";
      } else {
        formData.orderType = "ORDER_TYPE_SELL";
      }
    }

    // console.log("Selected Action Type:", actionType);
    // console.log("Selected Tab:", activeTab);
    // console.log("Form Data:", formData);

    const requestBody = {
      actionType: formData.orderType,
      symbol: formData.symbol,
      volume: parseFloat(formData.volume),
      openPrice: parseFloat(formData.openPrice),
      takeProfit: parseFloat(formData.takeProfit),
      stopLoss: parseFloat(formData.stopLoss),
      stopLimitPrice: formData.stopLimitPrice,
    };

    try {
      const response = await fetch("/api/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        toast.success("Trade Place Successfully !!", {
          duration: 5000,
        });
        router.push("/dashboard/live");
        // console.log("Trade request successful:", responseData);
      } else {
        // Request failed
        // console.error("Trade request failed:", response.statusText);
      }
    } catch (error) {
      // console.error("An error occurred:", error);
    }
  };

  return (
    <div className="w-full lg:max-w-lg mx-auto mt-10 px-8 py-6 bg-gray-200 rounded-md shadow-lg">
      <div className="mb-4">
        <div className="flex flex-wrap gap-4 md:space-x-3">
          <button
            className={` text-md font-medium px-4 py-2 rounded-md  ${
              activeTab === "LIMIT"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("LIMIT")}
          >
            LIMIT
          </button>
          <button
            className={`  text-md font-medium px-4 py-2 rounded-md ${
              activeTab === "MARKET"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("MARKET")}
          >
            MARKET
          </button>
          <button
            className={`  text-md font-medium px-4 py-2 rounded-md ${
              activeTab === "STOP"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("STOP")}
          >
            STOP
          </button>
          <button
            className={` text-md font-medium px-4 py-2 rounded-md ${
              activeTab === "STOP_LIMIT"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
            onClick={() => handleTabChange("STOP_LIMIT")}
          >
            STOP LIMIT
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="label">Symbol:</label>
          <select
            required
            name="symbol"
            className="select "
            onChange={handleInputChange}
          >
            <option value="">Select Symbol</option>
            {symbolOptions.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="label">Volume:</label>
          <input
            required
            type="number"
            min="0"
            max="5.0"
            step="0.001"
            name="volume"
            className="input"
            onChange={handleInputChange}
          />
        </div>

        {activeTab === "LIMIT" && (
          <>
            <div className="mb-4">
              <label className="label">Open Price:</label>
              <input
                required
                type="number"
                min="0"
                step="0.001"
                name="openPrice"
                className="input"
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {activeTab === "STOP_LIMIT" && (
          <>
            <div className="mb-4">
              <label className="label">Open Price:</label>
              <input
                required
                type="number"
                min="0"
                max="5.0"
                step="0.001"
                name="openPrice"
                className="input"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="label">Stop Limit Price:</label>
              <input
                required
                type="number"
                min="0"
                step="0.001"
                name="stopLimitPrice"
                className="input"
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {activeTab === "STOP" && (
          <div className="mb-4">
            <label className="label">Open Price:</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              name="openPrice"
              className="input"
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="label">Take Profit:</label>
          <input
            type="number"
            min="0"
            step="0.001"
            name="takeProfit"
            className="input"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="label">Stop Loss:</label>
          <input
            type="number"
            min="0"
            step="0.001"
            name="stopLoss"
            className="input"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 flex   space-x-6 w-full md:justify-center ">
          <button
            className="text-lg font-medium px-4 py-2 bg-[#0ccb81] text-white rounded-md w-[150px]"
            type="submit"
            onClick={() => setAcionType("BUY")}
          >
            Buy
          </button>
          <button
            className="text-lg font-medium px-4 py-2 bg-[#f7475c] text-white rounded-md ml-2 w-[150px]"
            type="submit"
            onClick={() => setAcionType("SELL")}
          >
            Sell
          </button>
        </div>
      </form>
    </div>
  );
}
