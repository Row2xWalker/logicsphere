

import { connectToDB } from "@utils/database";
import PropertyAcknowledgement from "@models/propertyAcknowledgement";

export const POST = async (req) => {
  const { 
    entityName,
    fundCluster,
    fromAccountableOfficer,
    toAccountableOfficer,
    properties,
    issuer,
    receiver
  } = await req.json();

  const date=new Date().toISOString()
  
  const ptrDate = new Date();
  const ptrMonth = ptrDate.getMonth() + 1
  const ptrYear = ptrDate.getFullYear()

  const ptr = `${ptrYear}-${("0"+ ptrMonth).slice(-2)}`
  try {
    await connectToDB();
    const query = {
      $expr:{
        $eq:[{ $month: '$date'}, ptrMonth]
      }
    }

    //format PTR number
    const ptrCount = await PropertyAcknowledgement.countDocuments(query)
    const finalPtrNumber = `${ptr}-${("000"+ptrCount).slice(-3)}`
    const newPropertyAcknowledgement = new PropertyAcknowledgement ({
        propertyAcknowledgementNumber: finalPtrNumber,
        entityName,
        fundCluster,
        fromAccountableOfficer,
        toAccountableOfficer,
        date,
        properties,
        issuer,
        receiver
    });

    await newPropertyAcknowledgement.save();

    return new Response(JSON.stringify(newPropertyAcknowledgement), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new property transfer document:", { status: 500 });
  }
};
