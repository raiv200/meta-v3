const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
const baseUrl = "https://copyfactory-api-v1.new-york.agiliumtrade.ai";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "auth-token": authToken,
};

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }
    const { searchParams } = new URL(request.url);
    const subscriberId = searchParams.get("subscriberId");
    // console.log("Subs Id", subscriberId);

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("Before Json", requestBody);
    // console.log("After Stringify Json", JSON.stringify(requestBody));
    const API_URL = `${baseUrl}/users/current/configuration/subscribers/${subscriberId}`;

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    //   const strategyResponse = await response.json();

    if (response?.status === 204) {
      // console.log("New User Strategy Data--->", response);

      return Response.json(
        { message: "Strategy Subscriprtion SuccessFull!!" },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Strategy Subscriprtion failed!!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error From Inside Subscribe-Strategy Post:", error);
  }

  return Response.json(
    { message: "Some Error Occured From POST Subscribe Strategy !!" },
    { status: 404 }
  );
}
