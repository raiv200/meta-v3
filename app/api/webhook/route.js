const PROD_URL = "https://meta-v3.vercel.app";

const WEB_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : "http://localhost:3000";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }
    // console.log("request is", request)
    // console.log("API Call POST /webhook");

    let passedValue = await request.text();
    let requestBody = JSON.parse(passedValue);

    console.log(" Request body ", requestBody);
    let orderType;

    // console.log(`Placed --- ${requestBody.actionType} for ${requestBody.symbol} Price  ${requestBody.price} `);

    if (requestBody?.actionType === 'buy') {
      orderType = "ORDER_TYPE_BUY";
    } else if (requestBody?.actionType === 'sell') {
      orderType = "ORDER_TYPE_SELL";
    }
    console.log(
      `Placed --- ${orderType} for ${requestBody.symbol} Price  ${requestBody.price} `
    );
    const newRequestBody = {
      actionType: orderType,
      symbol: requestBody.symbol,
      price: parseFloat(requestBody.price).toFixed(2),
    };
    try {
      const response = await fetch(`${WEB_URL}/api/trade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequestBody),
      });

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        // console.log("Trade request successful:", responseData);
      } else {
        // Request failed
        // console.log("Trade request failed:", response.statusText);
      }

      return Response.json(
        {
          message: "All Ok!",
          data: newRequestBody,
        },
        { status: 200 }
      );
    } catch (error) {
      // console.log("An error occurred:", error);
    }

    // } else if (actionType === "ORDER_TYPE_SELL") {
    //   // console.log(
    //   //   `Placed --- ${actionType} For ${symbol} , Volume : ${volume}`
    //   // );
    //   const newRequestBody = {
    //     actionType: requestBody.actionType,
    //     symbol: requestBody.symbol,
    //     volume: requestBody.price,
    //   };
    //   try {
    //     const response = await fetch(`${WEB_URL}/api/trade`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newRequestBody),
    //     });

    //     if (response.ok) {
    //       // Request was successful
    //       const responseData = await response.json();
    //       // console.log("Trade request successful:", responseData);
    //     } else {
    //       // Request failed
    //       console.error("Trade request failed:", response.statusText);
    //     }
    //   } catch (error) {
    //     // console.log("An error occurred:", error);
    //   }

    //   return Response.json(
    //     {
    //       message: "All Ok!",
    //       data: {
    //         actionType,
    //         symbol,
    //         volume,
    //       },
    //     },
    //     { status: 200 }
    //   );
    // }else  if (actionType === "ORDER_TYPE_BUY_LIMIT") {
    //   // console.log(
    //   //   `Placed --- ${actionType} For ${symbol} , Volume : ${volume}`
    //   // );
    //   const newRequestBody = {
    //     actionType: requestBody.actionType,
    //     symbol: requestBody.symbol,
    //     volume: requestBody.volume,
    //   };
    //   try {
    //     const response = await fetch(`${WEB_URL}/api/trade`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newRequestBody),
    //     });

    //     if (response.ok) {
    //       // Request was successful
    //       const responseData = await response.json();
    //       // console.log("Trade request successful:", responseData);
    //     } else {
    //       // Request failed
    //       console.error("Trade request failed:", response.statusText);
    //     }
    //   } catch (error) {
    //     // console.log("An error occurred:", error);
    //   }

    //   return Response.json(
    //     {
    //       message: "All Ok!",
    //       data: {
    //         actionType,
    //         symbol,
    //         volume,
    //       },
    //     },
    //     { status: 200 }
    //   );
    // }else  if (actionType === "ORDER_TYPE_SELL_LIMIT") {
    //   // console.log(
    //   //   `Placed --- ${actionType} For ${symbol} , Volume : ${volume}`
    //   // );
    //   const newRequestBody = {
    //     actionType: requestBody.actionType,
    //     symbol: requestBody.symbol,
    //     volume: requestBody.volume,
    //   };
    //   try {
    //     const response = await fetch(`${WEB_URL}/api/trade`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newRequestBody),
    //     });

    //     if (response.ok) {
    //       // Request was successful
    //       const responseData = await response.json();
    //       // console.log("Trade request successful:", responseData);
    //     } else {
    //       // Request failed
    //       console.error("Trade request failed:", response.statusText);
    //     }
    //   } catch (error) {
    //     // console.log("An error occurred:", error);
    //   }

    //   return Response.json(
    //     {
    //       message: "All Ok!",
    //       data: {
    //         actionType,
    //         symbol,
    //         volume,
    //       },
    //     },
    //     { status: 200 }
    //   );
    // }

    return Response.json(
      {
        message: "No Order Type Specified",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error is !!!", err);
    return Response.json(
      {
        message: "Something went Wrong !!!",
      },
      { status: 400 }
    );
  }
}
