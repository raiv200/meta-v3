const PROD_URL = "https://meta-v3.vercel.app";

const WEB_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : "http://localhost:3000";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }
    // console.log("request is", request)
    // console.log("API Call POST /webhook");

    let passedValue = await request.text();
    let requestBody = JSON.parse(passedValue);

    console.log(" Request body Fro Trading View", requestBody);



    if(requestBody?.Position.toLowerCase() === "flat" ){
      return Response.json(
        {
          message: "Invalid WebHook Request!! No Trade Placed",
          position: requestBody?.Position,
        },
        { status: 404 }
      );
    }

    let orderType;

    if (requestBody?.actionType === "buy") {
      orderType = "ORDER_TYPE_BUY";
    } else if (requestBody?.actionType === "sell") {
      orderType = "ORDER_TYPE_SELL";
    }
    // console.log(
    //   `Placed --- ${orderType} for ${requestBody.symbol} Price  ${requestBody.price} `
    // );

    const newRequestBody = {
      actionType: orderType,
      symbol: requestBody.symbol,
      price: Number(requestBody.price),
    };


    console.log("New Request Body Webhook API", newRequestBody);

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
        console.log("Trade request successful:", responseData);
        return Response.json(
          {
            message: "All Ok!",
            data: responseData,
          },
          { status: 200 }
        );
      } else {
        // Request failed
        // console.log("Trade request failed:", response.statusText);
      }

      return Response.json(
        {
          message: "Error ",
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
