const authToken = process.env.META_AUTH_TOKEN;
const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";
// const positionId = 46648037;


const headers = {
  'Accept': "application/json",
  "auth-token": authToken,
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const positionId  = searchParams.get("positionId");


    const API_URL = `${baseUrl}/users/current/accounts/${accountId}/positions/${positionId}`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if(!data || data.length === 0){
      return Response.json({ message: "No  Positions Id Found" }, { status: 200 });
    }

    // console.log("New User Account Positions By ID -- Data --> ", data);

    const newRequestBody = {};
    for (const key in data) {
      newRequestBody[key.toLowerCase()] = data[key];
    }

    // console.log("New User Account Positions By ID  --> ",newRequestBody);

    

    return Response.json({data:data}, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}
