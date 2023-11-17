import {
  getUserSubAccounts,
  insertUserSubAccountInfo,
} from "../../../db/postgres";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log(
    //   "Old Request Body Account Data ---> ",
    //   JSON.stringify(requestBody)
    // );

    console.log("New Request Body", requestBody);

    const newRequestBody = {};

    for (const key in requestBody) {
      const convertedKey = key
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase();
      newRequestBody[convertedKey] = requestBody[key];
    }

      const user_sub_accounts = await getUserSubAccounts(newRequestBody.user_id);
      // console.log("All users from Database ---> ", user_sub_accounts);

      let isUserExist = false;
      let data;

      if (user_sub_accounts.length > 0) {
        user_sub_accounts.map((subAccount) => {
          if (subAccount.login === newRequestBody.login) {
            isUserExist = true;
            data=subAccount;
            return;
          }
        });
      }

      if (isUserExist) {
        // console.log("Yes User Exist !!!");
        return Response.json(
          { message: "User Already Exist !!", data: data },
          { status: 409 }
        );
      }

    console.log("New Request Body Account Data --->",newRequestBody);
    const finalRequestBody = {
      account_id: newRequestBody.account_id,
      user_id:newRequestBody.user_id,
      state:newRequestBody.state,
      password:newRequestBody.password,
      account_type:newRequestBody.account_type,
      region:newRequestBody.region,
      broker:newRequestBody.broker,
      currency:newRequestBody.currency,
      server:newRequestBody.server,
      balance:newRequestBody.balance,
      equity:newRequestBody.equity,
      margin:newRequestBody.margin,
      free_margin:newRequestBody.free_margin,
      leverage:newRequestBody.leverage,
      type:newRequestBody.type,
      name:newRequestBody.name,
      login:newRequestBody.login,
      credit:newRequestBody.credit,
      platform:newRequestBody.platform,
      trade_allowed:newRequestBody.trade_allowed,
      margin_mode:newRequestBody.margin_mode,
      investor_mode:newRequestBody.investor_mode,
      account_currency_exchange_rate:1,
      magic:newRequestBody.magic,
      account_name:newRequestBody.account_name,
      connection_status:newRequestBody.connection_status,
      quote_streaming_interval_in_seconds:newRequestBody.quote_streaming_interval_in_seconds,
      reliability:newRequestBody.reliability,
      tags:newRequestBody.tags,
      resource_slots:newRequestBody.resource_slots,
      copy_factory_resource_slots:newRequestBody.copy_factory_resource_slots,
      version:newRequestBody.version,
      hash:newRequestBody.hash,
      copy_factory_roles:newRequestBody.copy_factory_roles,
      application:newRequestBody.application,
      created_at:newRequestBody.created_at,
      primary_replica:newRequestBody.primary_replica,
      account_replicas:newRequestBody.account_replicas,
      connections:newRequestBody.connections
    }

    console.log("Final Request Body ",finalRequestBody)

    const result = await insertUserSubAccountInfo(finalRequestBody);
    console.log("Result After Insert SuccessFull", result);

    return Response.json({
      message: "New Request Body with New User Sub Account Data",
      data: newRequestBody,
    });
  } catch (err) {
    console.error("Fetch error From Inside add Sub Account Post:", err);
  }

  return Response.json(
    { message: "Some Error Occured From POST SignUp !!" },
    { status: 404 }
  );
}
