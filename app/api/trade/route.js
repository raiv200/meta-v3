const authToken = process.env.META_AUTH_TOKEN;
const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";
const API_URL = `${baseUrl}/users/current/accounts/${accountId}/trade`;

export const dynamic = "force-dynamic"

const headers = {
  'Content-Type': 'application/json',
  'Accept': "application/json",
  'auth-token': authToken,
};

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    let newRequestBody = {};

    if (
      requestBody.actionType === "ORDER_TYPE_BUY" ||
      requestBody.actionType === "ORDER_TYPE_SELL"
    ) {
      newRequestBody.actionType = requestBody.actionType ;
      newRequestBody.symbol = requestBody.symbol === 'GOLD' ? 'XAUUSD' : requestBody.symbol === 'SILVER' ? 'XAGUSD' :'';
      newRequestBody.volume = 0.01;
      newRequestBody.takeProfit =  
      requestBody.actionType === "ORDER_TYPE_BUY" && requestBody.symbol === "GOLD"
      ? Number((requestBody.price * (1.025)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_SELL" && requestBody.symbol === "GOLD"
      ? Number((requestBody.price * (0.998)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_BUY" && requestBody.symbol === "SILVER"
      ?  Number((requestBody.price * (1.025)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_SELL" && requestBody.symbol === "SILVER"
      ?  Number((requestBody.price * (0.998)).toFixed(3))
      : "",
      newRequestBody.stopLoss = 
      requestBody.actionType === "ORDER_TYPE_BUY" && requestBody.symbol === "GOLD"
      ? Number((requestBody.price * (0.999)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_SELL" && requestBody.symbol === "GOLD"
      ? Number((requestBody.price * (1.015)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_BUY" && requestBody.symbol === "SILVER"
      ?  Number((requestBody.price * (0.999)).toFixed(3))
      : requestBody.actionType === "ORDER_TYPE_SELL" && requestBody.symbol === "SILVER"
      ?  Number((requestBody.price * (1.015)).toFixed(3))
      : "" 

    }

    console.log("New Request Body From Trade API",newRequestBody);

     //  For sell Order

    // newRequestBody.actionType = requestBody.actionType;
    // newRequestBody.symbol = requestBody.symbol ? requestBody.symbol : '';
    // newRequestBody.volume = 0.01;
    // newRequestBody.takeProfit = requestBody.price*0.999;
    // newRequestBody.stopLoss = requestBody.price*1.002;

    // if (
    //   requestBody.actionType === "ORDER_TYPE_BUY_LIMIT" ||
    //   requestBody.actionType === "ORDER_TYPE_SELL_LIMIT"
    // ) {
    //   newRequestBody.actionType = requestBody.actionType;
    //   newRequestBody.symbol =  requestBody.symbol ? "CADJPYm" : "CADJPYm";
    //   newRequestBody.volume = 0.01;
    //   newRequestBody.openPrice = requestBody.openPrice;
    //   // newRequestBody.takeProfit = requestBody.takeProfit;
    //   // newRequestBody.stopLoss=requestBody.stopLoss;
    // }

    // if (
    //   requestBody.actionType === "ORDER_TYPE_BUY_STOP" ||
    //   requestBody.actionType === "ORDER_TYPE_SELL_STOP"
    // ) {
    //   newRequestBody.actionType = requestBody.actionType;
    //   newRequestBody.symbol = requestBody.symbol;
    //   newRequestBody.volume = requestBody.volume;
    //   newRequestBody.openPrice = requestBody.openPrice;
    //   newRequestBody.takeProfit = requestBody.takeProfit;
    //   newRequestBody.stopLoss = requestBody.stopLoss;
    // }

    // if (
    //   requestBody.actionType === "ORDER_TYPE_BUY_STOP_LIMIT" ||
    //   requestBody.actionType === "ORDER_TYPE_SELL_STOP_LIMIT"
    // ) {
    //   newRequestBody.actionType = requestBody.actionType;
    //   newRequestBody.symbol = requestBody.symbol;
    //   newRequestBody.volume = requestBody.volume;
    //   newRequestBody.openPrice = requestBody.openPrice;
    //   newRequestBody.takeProfit = requestBody.takeProfit;
    //   newRequestBody.stopLoss = requestBody.stopLoss;
    // }

    // console.log("New Request Body ---> ", JSON.stringify(newRequestBody));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body:JSON.stringify(newRequestBody)
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tradeResponse = await response.json();

    // console.log("Response from Trade API ---> ", tradeResponse);

    // console.log("Trade API Called by Webhook ", newRequestBody);

    return Response.json(
      { message: "Trade API Called by Webhook", data: tradeResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}

// const newRequestBody = {};
//     for (const key in data) {
//       newRequestBody[key.toLowerCase()] = data[key];
//     }
