"use client";

import React from "react";
import StrategyCard from "./strategy-card";

export default function StrategyList({
  providerAccountId,
  tradeStrategyDataList,
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-4  place-items-center gap-4 mt-0 md:mt-20 w-full border-2  border-red-500 py-8">
        {tradeStrategyDataList?.map((data) => (
          <div key={data.strategy_id} className="min-w-1/3 w-full ">
            <StrategyCard
              providerAccountId={providerAccountId}
              strategyId={data.strategy_id}
              strategyName={data.strategy_name}
              strategyDescription={data.strategy_description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
