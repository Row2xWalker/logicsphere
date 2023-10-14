

import { connectToDB } from "@utils/database";
import PropertyTransfer from "@models/propertyTransfer";

export const POST = async (req) => {
  const { 
    propertyTransferNumber,
    entityName,
    fundCluster,
    fromAccountableOfficer,
    toAccountableOfficer,
    transferType,
    transferReason,
    properties,
    approver,
    issuer,
    receiver
  } = await req.json();

  const date=new Date().toISOString()
  
  // const ptrDate = new Date();
  // const ptrMonth = ptrDate.getMonth() + 1
  // const ptrYear = ptrDate.getFullYear()

  // const ptr = `${ptrYear}-${("0"+ ptrMonth).slice(-2)}`
  try {
    await connectToDB();
    const query = {
      $expr:{
        $eq:[{ $month: '$date'}, ptrMonth]
      }
    }

    //format PTR number
    // const ptrCount = await PropertyTransfer.countDocuments(query)
    // const finalPtrNumber = `${ptr}-${("000"+ptrCount).slice(-3)}`
    const newPropertyTransfer = new PropertyTransfer ({
      propertyTransferNumber,
      entityName,
      fundCluster,
      fromAccountableOfficer,
      toAccountableOfficer,
      date,
      transferType,
      transferReason,
      properties,
      approver,
      issuer,
      receiver
    });

    await newPropertyTransfer.save();

    return new Response(JSON.stringify(newPropertyTransfer), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new property transfer document:", { status: 500 });
  }
};
