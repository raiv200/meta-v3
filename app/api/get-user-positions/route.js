import {
  deleteLivePositionsById,
  getAllUserLivePositionData,
  getAllUserOpenOrdersData,
  insertNewUserLivePositions,
  updateLivePositionsById,
} from "../../../db/postgres";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

export const dynamic = "force-dynamic"

const headers = {
  Accept: "application/json",
  "auth-token": authToken,
};

function modifyArrayOfObjects(inputArray, accountId, userId) {
  return inputArray.map((item) => {
    const modifiedItem = {
      user_id: userId,
      account_id: accountId,
      position_id: item.id,
      platform: item.platform,
      position_type: item.type,
      symbol: item.symbol,
      magic: item.magic,
      time: item.time,
      broker_time: item.brokerTime,
      update_time: item.updateTime,
      open_price: item.openPrice,
      volume: item.volume,
      swap: item.swap,
      commission: item.commission,
      realized_swap: item.realizedSwap,
      realized_commission: item.realizedCommission,
      unrealized_swap: item.unrealizedSwap,
      unrealized_commission: item.unrealizedCommission,
      reason: item.reason,
      current_price: item.currentPrice,
      current_tick_value: item.currentTickValue,
      realized_profit: item.realizedProfit,
      unrealized_profit: item.unrealizedProfit,
      profit: item.profit,
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

    const API_URL = `${baseUrl}/users/current/accounts/${requestBody.accountId}/positions`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const positionsData = await response.json();

    // console.log("Live Positions Data ---> ", positionsData);

    // Get all positions from database
    // const userLivePositionDB = await getAllUserLivePositionData(
    //   requestBody?.userId
    // );

    // console.log("Live Positions Data from DB ---> ", userLivePositionDB);

    // Get all open orders from database
    // const userOpenOrdersDB = await getAllUserOpenOrdersData(
    //   requestBody?.userId
    // );

    // console.log("Open orders Data from DB ---> ", userOpenOrdersDB);

    if (!positionsData || positionsData.length === 0) {
      return Response.json(
        { message: "No  Positions Found", data: [] },
        { status: 404 }
      );
    }

    if (positionsData.length > 0) {
      // console.log("Live Positions  Data Exist --->", positionsData);

      const modifiedArray = modifyArrayOfObjects(
        positionsData,
        requestBody.accountId,
        requestBody.userId
      );

      // const result = await insertNewUserLivePositions(modifiedArray);
      // console.log("Result After Insert Positions", result);

      return Response.json(
        { message: "Positions Fetched !!", data: modifiedArray },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "No Positions Found !!", data: [] },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}

// if (userLivePositionDB.length > 0) {
//   // Filter Positions
//   const filteredData = positionsData.filter((apiItem) => {
//     return !userLivePositionDB.some(
//       (dbItem) => dbItem.position_id === apiItem.id
//     );
//   });

//   if (filteredData.length > 0) {
//     console.log("Live Positions Filtered  Data --->", filteredData);

//     const modifiedArray = modifyArrayOfObjects(
//       filteredData,
//       requestBody.accountId,
//       requestBody.userId
//     );

//     const result = await insertNewUserLivePositions(modifiedArray);
//     console.log("Result After Insert Positions", result);

//     return Response.json(
//       {
//         message: "Positions Fetched Filtred Data !!",
//         data: filteredData,
//       },
//       { status: 200 }
//     );
//   } else {
//     if (positionsData.length > 0) {
//       const modifiedArray = modifyArrayOfObjects(
//         positionsData,
//         requestBody.accountId,
//         requestBody.userId
//       );

//       modifiedArray.map(async (data) => {
//         const result = await updateLivePositionsById(
//           data.position_id,
//           data
//         );
//         console.log("(Updated to Latest Live Positions Data)", result);
//       });

//       return Response.json(
//         {
//           message: "No New Position Found!!,(Updated Latest)",
//           data: positionsData,
//         },
//         { status: 200 }
//       );
//     }
//   }
// } else {
//   if (positionsData.length > 0) {
//     console.log("Live Positions  Data --->", positionsData);

//     const modifiedArray = modifyArrayOfObjects(
//       positionsData,
//       requestBody.accountId,
//       requestBody.userId
//     );

//     // const result = await insertNewUserLivePositions(modifiedArray);
//     // console.log("Result After Insert Positions", result);

//     return Response.json(
//       { message: "Positions Fetched !!", data: positionsData },
//       { status: 200 }
//     );
//   }else{
//     return Response.json(
//       { message: "No Positions Found !!", data: [] },
//       { status: 404 }
//     );
//   }
// }
