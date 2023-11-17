"use client";

import React from "react";
import FormatDateTime from "../utlis/formattedDate";

export default function DataTable({ tableData }) {
  return (
    <div className="relative  overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" className="px-2 py-3">
              Symbol
            </th>
            <th scope="col" className="px-2 py-3">
              Deal Id
            </th>
            <th scope="col" className="px-2 py-3">
              Order Id
            </th>
            <th scope="col" className="px-2 py-3">
              Time
            </th>
            <th scope="col" className="px-2 py-3">
              Type
            </th>
            <th scope="col" className="px-2 py-3">
              Entry Type
            </th>
            <th scope="col" className="px-2 py-3">
              Volume
            </th>

            <th scope="col" className="px-2 py-3">
              Price
            </th>
            <th scope="col" className="px-2 py-3">
              Commision
            </th>
            <th scope="col" className="px-2 py-3">
              Swap
            </th>
            <th scope="col" className="px-2 py-3">
              Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data,index) => (
            <tr
              key={index}
              className="bg-white border-b font-medium text-gray-900  hover:bg-gray-50"
            >
              <td className="px-2 py-4  ">{data.symbol}</td>
              <td className="px-2 py-4">{data.deal_id}</td>
              <td className="px-2 py-4">{data.order_id}</td>
              <td className="px-2 py-4">{FormatDateTime(data.time)}</td>
              <td className={`px-2 py-4 `}>
                <span
                  className={`py-1 px-2 text-xs rounded-full ${
                    data.type.includes("BUY")
                      ? "bg-green-500 text-gray-100 rounded-full"
                      : data.type.includes("SELL")
                      ? "bg-red-500 text-gray-100 rounded-full"
                      : ""
                  }`}
                >
                  {data.type}
                </span>
              </td>
              <td className="px-2 py-4">{data.entry_type}</td>
              <td className="px-2 py-4">{data.volume}</td>
              <td className="px-2 py-4">{data.price}</td>
              <td className="px-2 py-4">{data.commission}</td>
              <td className="px-2 py-4">{data.swap}</td>
              <td className="px-2 py-4">{data.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
