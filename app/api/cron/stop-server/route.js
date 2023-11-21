
export const dynamic = 'force-dynamic';

export async function GET() {

     let action = "UNDEPLOY";
     let data = [
      {
        accountId:"acc-123"
      },{
        accountId:"acc-456"
      }
     ];
    
    if (action === "UNDEPLOY") {
      console.log("Server Undeployed SuccessFully");
  
      return Response.json(
        {
          message: "Server Undeployed SuccessFully",
          data:data,
          status: 200,
        },
        { status: 200 }
      );
    }else{
      return Response.json(
        {
          message: "Server Undeployed Failed !!",
          status: 400,
        },
        { status: 400 }
      );
    }
  }