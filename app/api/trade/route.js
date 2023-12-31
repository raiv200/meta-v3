// const authTokenNew = process.env.META_AUTH_TOKEN;
// const newAccountId = process.env.META_ACCOUNT_ID;
// const authTokenOld = process.env.META_AUTH_TOKEN_OLD;
// const oldAccountId = process.env.META_ACCOUNT_ID_OLD;

// // const accountId = "aaf9dba9-f7c8-4b57-988e-233933d0b96f";
// const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

// export const dynamic = "force-dynamic"



// export async function POST(request) {
//   try {
//     if (!request.body) {
//       return Response.json({ message: "No Request Body Provided!!" });
//     }

//     const bodyText = await request.text(); // Read the body as text
//     const requestBody = JSON.parse(bodyText);
//     let accountId;

//     if(requestBody?.tf.toLowerCase() === '15m'){
//       accountId= oldAccountId;
//     }else if(requestBody?.tf.toLowerCase() === '5m'){
//       accountId= newAccountId;
//     }

//     console.log("AccountId",accountId);

//     const API_URL = `${baseUrl}/users/current/accounts/${accountId}/trade`;

//     const headers = {
//       'Content-Type': 'application/json',
//       'Accept': "application/json",
//       'auth-token': requestBody?.tf.toLowerCase() === '15m' ? authTokenOld : requestBody?.tf.toLowerCase() === '5m' ? authTokenNew : authTokenNew
//     };

//     let newRequestBody = {};

//     if (
//       requestBody.actionType === "ORDER_TYPE_BUY" ||
//       requestBody.actionType === "ORDER_TYPE_SELL"
//     ) {
//       newRequestBody.actionType = requestBody.actionType ;
//       newRequestBody.symbol = requestBody.symbol === 'GOLD' ? 'XAUUSD' 
//       : requestBody.symbol === 'SILVER' ? 'XAGUSD' 
//       : requestBody.tf.toLowerCase() === '5m' ? requestBody.symbol : requestBody.tf.toLowerCase() === '15m' ? requestBody.symbol + '.V' : requestBody.symbol;

      
//       newRequestBody.volume = 0.1;

//       newRequestBody.takeProfit = requestBody.actionType === "ORDER_TYPE_BUY" 
//       ? Number((requestBody.price * (1.001)).toFixed(3))
//       : requestBody.actionType === "ORDER_TYPE_SELL" 
//       ? Number((requestBody.price * (0.999)).toFixed(3))
//       : "",
      
//       newRequestBody.stopLoss = requestBody.actionType === "ORDER_TYPE_BUY" 
//       ? Number((requestBody.price * (0.999)).toFixed(3))
//       : requestBody.actionType === "ORDER_TYPE_SELL" 
//       ? Number((requestBody.price * (1.001)).toFixed(3))
//       : "" 

//     }

//     console.log("New Request Body From Trade API",newRequestBody);

//      //  For sell Order

//     // newRequestBody.actionType = requestBody.actionType;
//     // newRequestBody.symbol = requestBody.symbol ? requestBody.symbol : '';
//     // newRequestBody.volume = 0.01;
//     // newRequestBody.takeProfit = requestBody.price*0.999;
//     // newRequestBody.stopLoss = requestBody.price*1.002;

//     // if (
//     //   requestBody.actionType === "ORDER_TYPE_BUY_LIMIT" ||
//     //   requestBody.actionType === "ORDER_TYPE_SELL_LIMIT"
//     // ) {
//     //   newRequestBody.actionType = requestBody.actionType;
//     //   newRequestBody.symbol =  requestBody.symbol ? "CADJPYm" : "CADJPYm";
//     //   newRequestBody.volume = 0.01;
//     //   newRequestBody.openPrice = requestBody.openPrice;
//     //   // newRequestBody.takeProfit = requestBody.takeProfit;
//     //   // newRequestBody.stopLoss=requestBody.stopLoss;
//     // }

//     // if (
//     //   requestBody.actionType === "ORDER_TYPE_BUY_STOP" ||
//     //   requestBody.actionType === "ORDER_TYPE_SELL_STOP"
//     // ) {
//     //   newRequestBody.actionType = requestBody.actionType;
//     //   newRequestBody.symbol = requestBody.symbol;
//     //   newRequestBody.volume = requestBody.volume;
//     //   newRequestBody.openPrice = requestBody.openPrice;
//     //   newRequestBody.takeProfit = requestBody.takeProfit;
//     //   newRequestBody.stopLoss = requestBody.stopLoss;
//     // }

//     // if (
//     //   requestBody.actionType === "ORDER_TYPE_BUY_STOP_LIMIT" ||
//     //   requestBody.actionType === "ORDER_TYPE_SELL_STOP_LIMIT"
//     // ) {
//     //   newRequestBody.actionType = requestBody.actionType;
//     //   newRequestBody.symbol = requestBody.symbol;
//     //   newRequestBody.volume = requestBody.volume;
//     //   newRequestBody.openPrice = requestBody.openPrice;
//     //   newRequestBody.takeProfit = requestBody.takeProfit;
//     //   newRequestBody.stopLoss = requestBody.stopLoss;
//     // }

//     // console.log("New Request Body ---> ", JSON.stringify(newRequestBody));

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: headers,
//       body:JSON.stringify(newRequestBody)
//     });
//     console.log("Newtwork Response from Trade API ---> ", response);
//     if (!response.ok) {
//       console.log("Newtwork Response from Trade API ---> ", response.json());
//       throw new Error("Network response was not ok");
//     }

//     const tradeResponse = await response.json();

//     console.log("Response from Trade API ---> ", tradeResponse);

//     console.log("Trade API Called by Webhook ", newRequestBody);

//     return Response.json(
//       { message: "Trade API Called by Webhook", data: tradeResponse },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }

//   return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
// }

// // const newRequestBody = {};
// //     for (const key in data) {
// //       newRequestBody[key.toLowerCase()] = data[key];
// //     }
