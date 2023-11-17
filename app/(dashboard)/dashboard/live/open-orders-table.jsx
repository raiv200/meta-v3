import React from "react";
import FormatDateTime from "../../../../utlis/formattedDate";

export default function OpenOrdersTable({ openOrdersData }) {
  // const firstObject = openOrdersData[0] ? openOrdersData[0] : [{}];

  // Get the keys of the first object
  // const keys = Object.keys(firstObject);

  return (
    <>
      {openOrdersData?.length === 0 ? (
        <div className="  w-full sm:max-h-[620px] ">No Open Orders Found!!</div>
      ) : (
        <div className="  w-full sm:max-h-[620px] custom-scroll overflow-x-auto shadow-md ">
          <table className="   text-sm  text-gray-500 ">
            <thead className=" text-xs text-left text-gray-700  uppercase bg-gray-50 ">
              <tr className="bg-gray-300">
                {/* {keys.map((item, i) => (
                  <th key={i} className="px-2 py-4 min-w-[150px] capitalize">{item}</th>
                ))} */}
                <th className="px-2 py-4 min-w-[150px]">Order ID</th>
                <th className="px-2 py-4 min-w-[150px]">Platform</th>
                <th className="px-2 py-4 min-w-[150px]">Type</th>
                <th className="px-2 py-4 min-w-[150px]">State</th>
                <th className="px-2 py-4 min-w-[150px]">Symbol</th>
                <th className="px-2 py-4 min-w-[150px]">Magic</th>
                <th className="px-2 py-4 min-w-[150px]">Time</th>
                <th className="px-2 py-4 min-w-[150px]">Broker Time</th>
                <th className="px-2 py-4 min-w-[150px]">Open Price</th>
                <th className="px-2 py-4 min-w-[150px]">Volume</th>
                <th className="px-2 py-4 min-w-[150px]">Current Volume</th>
                <th className="px-2 py-4 min-w-[150px]">Position ID</th>
                <th className="px-2 py-4 min-w-[150px]">Reason</th>
                <th className="px-2 py-4 min-w-[150px]">Current Price</th>
                <th className="px-2 py-4 min-w-[150px]">
                  Account Currency Exchange Rate
                </th>
                <th className="px-2 py-4 min-w-[150px]">
                  Update Sequence Number
                </th>
              </tr>
            </thead>
            <tbody>
              {openOrdersData?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white z-0 border-b font-medium text-gray-900 hover:bg-gray-50"
                >
                  <td className="px-2 py-4">{item.order_id}</td>
                  <td className="px-2 py-4">{item.platform}</td>
                  <td className="px-2 py-4">{item.type}</td>
                  <td className="px-2 py-4">{item.state}</td>
                  <td className="px-2 py-4">{item.symbol}</td>
                  <td className="px-2 py-4">{item.magic}</td>
                  <td className="px-2 py-4">{FormatDateTime(item.time)}</td>
                  <td className="px-2 py-4">{FormatDateTime(item.broker_time)}</td>
                  <td className="px-2 py-4">{item.open_price}</td>
                  <td className="px-2 py-4">{item.volume}</td>
                  <td className="px-2 py-4">{item.current_volume}</td>
                  <td className="px-2 py-4">{item.position_id}</td>
                  <td className="px-2 py-4">{item.reason}</td>
                  <td className="px-2 py-4">{item.current_price}</td>
                  <td className="px-2 py-4">
                    {item.account_currency_exchange_rate}
                  </td>
                  <td className="px-2 py-4">{item.update_sequence_number}</td>
                </tr>
                // <tr
                //   key={index}
                //   className="bg-white z-0 border-b font-medium text-gray-900 hover:bg-gray-50"
                // >
                //   {keys.map((data, i) => (
                //     <td key={i} className="px-2 py-4 min-w-[150px]">{item[data]}</td>
                //   ))}
                // </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
