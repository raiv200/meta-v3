import {
  deleteOpenOrdersById,
  getAllUserOpenOrdersData,
  insertNewUserOpenOrders,
  updateOpenOrdersById,
  updateOpenOrdersState,
} from "../../../db/postgres";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

const headers = {
  Accept: "application/json",
  "auth-token": authToken,
};

function modifyArrayOfObjects(inputArray, accountId, userId) {
  return inputArray.map((item) => {
    const modifiedItem = {
      user_id: userId,
      account_id: accountId,
      order_id: item.id,
      platform: item.platform,
      order_type: item.type,
      state: item.state,
      symbol: item.symbol,
      magic: item.magic,
      time: item.time,
      broker_time: item.brokerTime,
      open_price: item.openPrice,
      volume: item.volume,
      current_volume: item.currentVolume,
      position_id: item.positionId,
      reason: item.reason,
      current_price: item.currentPrice,
      account_currency_exchange_rate: item.accountCurrencyExchangeRate,
      update_sequence_number: item.updateSequenceNumber,
    };
    return modifiedItem;
  });
}

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}/orders`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const openOrdersData = await response.json();
    console.log("Open Orders Data ---> ", openOrdersData);

    // Get all open orders from database
    // const userOpenOrdersDB = await getAllUserOpenOrdersData(
    //   requestBody?.userId
    // );
    // console.log("Open Orders Data from DB ---> \n ", userOpenOrdersDB);

    if (openOrdersData && openOrdersData.length === 0) {
      return Response.json(
        { message: "No Open Orders Found", data: [] },
        { status: 404 }
      );
    }

    if (openOrdersData.length > 0) {
      console.log("Open Orders  Data --->", openOrdersData);

      const modifiedArray = modifyArrayOfObjects(
        openOrdersData,
        requestBody.accountId,
        requestBody.userId
      );

      // const result = await insertNewUserOpenOrders(modifiedArray);
      // console.log("Result After Insert Open Orders", result);

      return Response.json(
        { message: "Open Orders Fetched !!", data: modifiedArray },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "No Open Orders Found !!", data: [] },
        { status: 404 }
      );
    }

    // return Response.json(
    //   { message: "No Open Orders Found !!", data: [] },
    //   { status: 404 }
    // );
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}

// if (userOpenOrdersDB.length > 0) {

//   // Check for filled orders from the API response and delete them from the database
//   const filledOrdersFromAPI = openOrdersData.filter(
//     (order) => order.state === "ORDER_STATE_FILLED"
//   );

//   if (filledOrdersFromAPI.length > 0) {
//     filledOrdersFromAPI.map(async (ord) => {
//       await deleteOpenOrdersById(ord.id);
//       console.log("Filled Orders Deleted from DB");
//     });
//   }

//   // Filter Positions

//   const filteredData = openOrdersData.filter((apiItem) => {
//     return !userOpenOrdersDB.some(
//       (dbItem) => dbItem.order_id === apiItem.id
//     );
//   });

//   if (filteredData.length > 0) {
//     console.log("Open Orders Filtered  Data --->", filteredData);

//     const modifiedArray = modifyArrayOfObjects(
//       filteredData,
//       requestBody.accountId,
//       requestBody.userId
//     );

//     const result = await insertNewUserOpenOrders(modifiedArray);
//     console.log("Result After Insert Open Orders", result);

//     return Response.json(
//       { message: "Open Orders Filter Data Fetched !!", data: openOrdersData },
//       { status: 200 }
//     );
//   }
// } else {
//   if (openOrdersData.length > 0) {
//     console.log("Open Orders  Data --->", openOrdersData);

//     const modifiedArray = modifyArrayOfObjects(
//       openOrdersData,
//       requestBody.accountId,
//       requestBody.userId
//     );

//     const result = await insertNewUserOpenOrders(modifiedArray);
//     console.log("Result After Insert Open Orders", result);

//     return Response.json(
//       { message: "Open Orders Fetched !!", data: openOrdersData },
//       { status: 200 }
//     );
//   }else{
//     return Response.json(
//       { message: "No Open Orders Found !!", data: [] },
//       { status: 404 }
//     );
//   }
// }
