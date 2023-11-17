import { deleteUserAccount, getAllUserAccount } from "../../../db/postgres";

export async function POST(request) {
  try {
    if (!request.body) {
      return Response.json({ message: "No Request Body Provided!!" });
    }

    const bodyText = await request.text(); // Read the body as text
    const requestBody = JSON.parse(bodyText);

    // console.log("New Request Body ---> ", JSON.stringify(requestBody));

    const usersAccount = await getAllUserAccount();
    // console.log("All user Account  from Database ---> ", usersAccount);

    let isUserExist = false;

    if (usersAccount.length > 0) {
      usersAccount.map((user) => {
        if (user?.email === requestBody.email) {
          isUserExist = true;
          return;
        }
      });
    }

    if (isUserExist) {
      // console.log("Yes User Exist !!!");
      const result = await deleteUserAccount(requestBody.email);
      // console.log("Result After Insert", result);
      // console.log("user email is", requestBody.email)
      return Response.json({ message: "User Deleted !!" }, { status: 200 });
    }

    return Response.json({
      message: "User Does Not exist!!",
    },{status:404});
  } catch (err) {
    console.error("Fetch error From Inside User Account:", err);
  }

  return Response.json(
    {
      message: "Some Error Occured From POST Dashboard for saving user data !!",
    },
    { status: 404 }
  );
}
