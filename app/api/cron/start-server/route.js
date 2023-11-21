export const dynamic = "force-dynamic";

export async function GET() {
  let action = "DEPLOY";
  let data = [
    {
      accountId: "acc-123",
    },
    {
      accountId: "acc-456",
    },
  ];
  if (action === "DEPLOY") {
    console.log("Server Deployed SuccessFully");

    return Response.json(
      {
        message: "Server Deployed SuccessFully",
        data: data,
        status: 200,
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        message: "Server Deployed Failed !!",
        status: 400,
      },
      { status: 400 }
    );
  }
}
