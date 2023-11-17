import { getAllUsers, insertUserSubAccountInfo } from "../../../db/postgres";

const authToken = process.env.META_AUTH_TOKEN;
// const accountId = process.env.META_ACCOUNT_ID;
// const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

const headers = {
  Accept: "application/json",
  "auth-token": authToken,
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const baseUrl = "https://mt-client-api-v1.new-york.agiliumtrade.ai";
  const baseUrlTwo =
    "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";

  const API_URL = `${baseUrl}/users/current/accounts/${accountId}/account-information`;
  const API_URL_TWO = `${baseUrlTwo}/users/current/accounts/${accountId}`;

  // if(accountId) {
  //   return Response.json({message:"All ok!",accountId:accountId})
  // }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      // throw new Error("Network response was not ok");
      return Response.json(
        { message: "Sever not connected Yet , Account info fetch failed!!", data: [],status:404 },
        { status: 404 }
      );
    }

    const data = await response.json();

    console.log("Data recieved from API_URL_ONE  --> ", data);

    

    const responseTwo = await fetch(API_URL_TWO, {
      method: "GET",
      headers: headers,
    });

    if (!responseTwo.ok) {
      // throw new Error("Network response was not ok");
      return Response.json(
        { message: "Sever not connected Yet , Account info fetch failed!!", data: [],status:404 },
        { status: 404 }
      );
    }

    const dataTwo = await responseTwo.json();

    console.log("Data recieved from API_URL_TWO  --> ", dataTwo);

    // const newRequestBody = {};
    // for (const key in data) {
    //   newRequestBody[key.toLowerCase()] = data[key];
    // }

    // console.log("Data to --> New Request Body--> ", newRequestBody);

    // const users = await getAllUsers();
    // console.log("All users from Database ---> ", users);

    // let isUserExist = false;

    //  if(users.length > 0){
    //   users.map((user) => {
    //     if(user.login === parseInt(newRequestBody.login)){
    //       isUserExist = true;
    //       return;
    //     }
    //   })
    //  }

    // if (isUserExist) {
    //   console.log("Yes User Exist !!!");
    //   return Response.json(
    //     { message: "User Already Exist !!" , data:data },
    //     { status: 409 }
    //   );
    // }

    // const result = await insertUserSubAccountInfo(newRequestBody);
    // console.log("Result After Insert", result);

    const allData = {
      ...data,
      accountName:dataTwo.name,
      magic: dataTwo.magic,
      connectionStatus: dataTwo.connectionStatus,
      quoteStreamingIntervalInSeconds: dataTwo.quoteStreamingIntervalInSeconds,
      reliability: dataTwo.reliability,
      tags: dataTwo.tags,
      resourceSlots: dataTwo.resourceSlots,
      copyFactoryResourceSlots: dataTwo.copyFactoryResourceSlots,
      version: dataTwo.version,
      hash: dataTwo.hash,
      copyFactoryRoles: dataTwo.copyFactoryRoles,
      application: dataTwo.application,
      createdAt: dataTwo.createdAt,
      primaryReplica: dataTwo.primaryReplica,
      accountReplicas: dataTwo.accountReplicas,
      connections: dataTwo.connections,
    };

    console.log("All Data from Account One + Two ---->", allData);

    return Response.json(
      { message: "User Found !!!", data: allData ,status:200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return Response.json({ message: "Some Error Occured !!" }, { status: 404 });
}
