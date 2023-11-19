import {
  getAllUserOrdersHistory,
  getUserOpenOrdersByAccountId,
  getUserOrdersHistoryByAccountId,
  getUserSubAccounts,
  getUserSubAccountsByAccountId,
  insertUserOrdersHistory,
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

export const dynamic = "force-dynamic"

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
      order_id: item.id,
      platform: item.platform,
      type: item.type,
      state: item.state,
      symbol: item.symbol,
      magic: item.magic,
      time: item.time,
      broker_time: item.brokerTime,
      open_price: item.openPrice,
      volume: item.volume,
      current_volume: item.currentVolume,
      position_id: item.positionId,
      done_time: item.doneTime,
      done_broker_time: item.doneBrokerTime,
      reason: item.reason,
      filling_mode: item.fillingMode,
      expiration_type: item.expirationType,
      account_currency_exchange_rate: item.accountCurrencyExchangeRate,
    };

    return modifiedItem;
  });
}


const fetchOrderHsitoryData = async (userId,accountId, accountName ) => {

  const API_URL = `${baseUrl}/users/current/accounts/${accountId}/history-orders/time/${startTime}/${endTime}`;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const orderHistoryData = await response.json();

   // Add user_id and account_id to each object
   const modifiedOrderHistory = orderHistoryData.map((data) => ({
    user_id: userId,
    account_id: accountId,
    account_name:accountName,
    ...data,
  }));

  return modifiedOrderHistory;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("User Id", userId);

    const userSubAccounts = await getUserSubAccounts(userId);
    // console.log("All Users Sub Account---->", userSubAccounts);

    

    
    let combinedOrderHistoryData = [];

    for (const user of userSubAccounts) {
      const orderHistoryData = await fetchOrderHsitoryData(
        user.user_id,
        user.account_id,
        user.account_name
      );

      // Combine the data for each user
      combinedOrderHistoryData = [...combinedOrderHistoryData, ...orderHistoryData];
    }

    console.log("Combined Order History ",combinedOrderHistoryData)

    // if(combinedOrderHistoryData.length > 0){

    //   const modifiedArray = modifyArrayOfObjects(combinedOrderHistoryData);

    //   return Response.json(
    //     { message: "All Users Order History !!!", data:modifiedArray },
    //     { status: 400 }
    //   );
    // }


    // const userSubAccount = await getUserSubAccountsByAccountId(accountId);

    // Get all positions from database
    const userOrderHistoryDB = await getAllUserOrdersHistory(userId);
    console.log("All User Order History DB", userOrderHistoryDB);

    if (userOrderHistoryDB.length > 0) {
      if (combinedOrderHistoryData.length > 0 ) {
        const filteredData = combinedOrderHistoryData.filter((apiItem) => {
          return !userOrderHistoryDB.some(
            (dbItem) => dbItem.order_id === apiItem.id
          );
        });
        
        console.log("filtered Data ", filteredData);

        if (filteredData.length === 0) {
          return Response.json(
            {
              message: "Order History Up to date Filtered!!",
              data: userOrderHistoryDB,
            },
            { status: 200 }
          );
        }

        const modifiedArray = modifyArrayOfObjects(filteredData);

        const addData = await insertUserOrdersHistory(modifiedArray);

        return Response.json(
          {
            message: "Order History Fetched Filtered !!",
            data: modifiedArray,
          },
          { status: 200 }
        );
      }
    } else {
      if (combinedOrderHistoryData.length > 0 ) {
        const modifiedArray = modifyArrayOfObjects(combinedOrderHistoryData);
        const addData = await insertUserOrdersHistory(modifiedArray);

        return Response.json(
          { message: "Order History Fetched !!", data: modifiedArray },
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


