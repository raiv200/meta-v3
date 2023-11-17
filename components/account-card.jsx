import {
  CandlestickChartIcon,
  CopyIcon,
  FileEditIcon,
  MoreVerticalIcon,
  PauseCircle,
  TrashIcon,
} from "lucide-react";
import React from "react";

export default function AccountCard({
  accountId,
  loginId,
  platform,
  accountName,
  serverName,
  accountType,
  state,
  reliability,
  application,
  connectionStatus,
  copyFactoryRoles
}) {
  return (
    <div className="rounded-md flex flex-col justify-center h-[250px] w-[520px]  space-y-6 px-4 py-4 border-2">
      <div className="flex items-center justify-between">
        {/* Account Id  */}

        <div className="flex items-center space-x-2">
          <p>ID:</p>
          <div className="flex items-center p-1 rounded-md space-x-4 border-2 border-dashed">
            <span>{accountId}</span>
            <CopyIcon className="h-5 w-5 text-gray-900" />
          </div>
        </div>

        {/* Edit Delete Button  */}
        <div className="flex  space-x-2">
          <FileEditIcon className="h-5 w-5  text-gray-900" />
          <TrashIcon className="h-5 w-5  text-gray-900" />
          <MoreVerticalIcon className="h-5 w-5  text-gray-900" />
        </div>
      </div>

      {/* Account Name  */}
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center space-x-2">
          <CandlestickChartIcon className="h-4 w-4 text-gray-900 " />
          <p className="text-md font-medium capitalize text-gray-700">
            {platform}-{loginId} :
          </p>
        </div>
        <h3 className=" text-md font-semibold text-gray-900">{accountName}</h3>
      </div>

      {/* Tags and Server Name  */}

      <div className="flex space-x-3">
        <div className="rounded-full bg-gray-200 text-gray-900 px-2 py-1 text-xs">
          {copyFactoryRoles.length > 0 ? "Copy Factory" : application}
        </div>
        <div className="rounded-full capitalize bg-gray-200 text-gray-900 px-2 py-1 text-xs">
          {reliability} Reliability
        </div>
        <div className="rounded-full bg-gray-200 text-gray-900 px-2 py-1 text-xs">
          {accountType}
        </div>

        <p className="text-md font-medium text-gray-700">{serverName}</p>
      </div>

      {/* Connection Status  */}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {connectionStatus ? (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-green-500 " />
              <div className="h-2 w-2 rounded-full bg-green-500 " />
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-red-500 " />
              <div className="h-2 w-2 rounded-full bg-red-500 " />
            </div>
          )}

          <p className="text-md capitalize font-medium text-gray-700">
            <span className="capitalize">{connectionStatus.toLowerCase()}</span> (Full Redundancy)
          </p>
        </div>
        {/* Account Status */}
        <div className="flex space-x-3">
          {state ? (
            <div className="rounded-full bg-green-400 text-gray-900 px-3 py-1.5 text-xs font-semibold">
              {state}
            </div>
          ) : (
            <div className="rounded-full bg-red-400 text-gray-900 px-3 py-1.5 text-xs font-semibold">
              Not Deployed
            </div>
          )}
          <button>
            <PauseCircle className="h-5 w-5  text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
