import {
  getAllUserTradeHistory,
  getUserSubAccounts,
  getUserSubAccountsByAccountId,
  getUserTradeHistoryByAccountId,
  insertUserTradeHistory,
  updateUserSubAccount,
} from "../../../db/postgres";
import { startTimeString, endTimeString } from "../../../utlis/time";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const startTime = startTimeString;
const endTime = endTimeString;
const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";
// const API_URL = `${baseUrl}/users/current/accounts/${accountId}/history-deals/time/${startTime}/${endTime}`;

const headers = {
  Accept: "application/json",
  "auth-token": authToken,
};

function modifyArrayOfObjects(inputArray) {
  return inputArray.map((item) => {
    const modifiedItem = {
      user_id:item.user_id,
      account_id:item.account_id,
      account_name:item.account_name,
      deal_id: item.id,
      platform: item.platform,
      type: item.type,
      time: item.time,
      broker_time: item.brokerTime,
      commission: item.commission,
      swap: item.swap,
      profit: item.profit,
      symbol: item.symbol,
      magic: item.magic,
      order_id: item.orderId,
      position_id: item.positionId,
      volume: item.volume,
      price: item.price,
      entry_type: item.entryType,
      reason: item.reason,
      account_currency_exchange_rate: item.accountCurrencyExchangeRate,
    };
    return modifiedItem;
  });
}

const fetchDataTradeHistory = async (userId,accountId, accountName ) => {

  const API_URL = `${baseUrl}/users/current/accounts/${accountId}/history-deals/time/${startTime}/${endTime}`;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const tradeHistoryData = await response.json();

   // Add user_id and account_id to each object
   const modifiedTradeHistory = tradeHistoryData.map((data) => ({
    user_id: userId,
    account_id: accountId,
    account_name:accountName,
    ...data,
  }));

  return modifiedTradeHistory;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("User Id", userId);

    const userSubAccounts = await getUserSubAccounts(userId);
    console.log("All Users Sub Account---->", userSubAccounts);

    
    let combinedTradeHistoryData = [];

    for (const user of userSubAccounts) {
      const tradeHistoryData = await fetchDataTradeHistory(
        user.user_id,
        user.account_id,
        user.account_name
      );

      // Combine the data for each user
      combinedTradeHistoryData = [...combinedTradeHistoryData, ...tradeHistoryData];
    }

    // if(combinedTradeHistoryData.length > 0){

    //   const modifiedArray = modifyArrayOfObjects(combinedTradeHistoryData);

    //   return Response.json(
    //     { message: "All Users Trade History !!!", data:modifiedArray },
    //     { status: 400 }
    //   );
    // }

    // const API_URL = `${baseUrl}/users/current/accounts/${accountId}/history-deals/time/${startTime}/${endTime}`;

    // const response = await fetch(API_URL, {
    //   method: "GET",
    //   headers: headers,
    // });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    // const tradeHistoryData = await response.json();

    // const userSubAccount = await getUserSubAccountsByAccountId(accountId);

    // Get all positions from database
    const userTradeHistoryDB = await getAllUserTradeHistory(
      userId
    );

    console.log("User Trade History DB",userTradeHistoryDB)

    if (userTradeHistoryDB.length > 0) {
      if (combinedTradeHistoryData.length > 0) {
        const filteredData = combinedTradeHistoryData.filter((apiItem) => {
          return !userTradeHistoryDB.some(
            (dbItem) => dbItem.deal_id === apiItem.id
          );
        });
        console.log("filtered data",filteredData);

        if(filteredData.length === 0){
          return Response.json(
            { message: "Trade History Up to date !!", data: userTradeHistoryDB },
            { status: 200 }
          );
        }

        const modifiedArray = modifyArrayOfObjects(filteredData);

        const addData = await insertUserTradeHistory(modifiedArray);

        // console.log("Account Updated !!!",addData);

        return Response.json(
          { message: "Trade History Fetched Filtered Data!!", data: modifiedArray },
          { status: 200 }
        );
      }
    } else {
      if (combinedTradeHistoryData.length > 0) {
        const modifiedArray = modifyArrayOfObjects(combinedTradeHistoryData);

        const addData = await insertUserTradeHistory(modifiedArray);

        // console.log("Account Updated !!!",addData);

        return Response.json(
          { message: "Trade History Fetched !!", data: modifiedArray },
          { status: 200 }
        );
      }
    }

    return Response.json(
      { message: "Some Error Occured !!!" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}
