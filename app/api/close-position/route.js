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

    const { searchParams } = new URL(request.url);
    const positionId = searchParams.get("positionId");

    if (requestBody.actionType !== "POSITION_CLOSE_ID") {
      return Response.json(
        { message: "Invalid Action Type!!" },
        { status: 400 }
      );
    }
    let newRequestBody = {
      actionType: requestBody.actionType,
      positionId: positionId,
    };

    // console.log("New Request Body ---> ", JSON.stringify(newRequestBody));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newRequestBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tradeResponse = await response.json();

    // console.log("Response from Trade API ---> ", tradeResponse);

    return Response.json(
      { message: "Position Closed Successfully", data: newRequestBody,tradeResponse:tradeResponse },
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
