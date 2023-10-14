

import { connectToDB } from "@utils/database";
import PropertyAcknowledgement from "@models/propertyAcknowledgement";

export const POST = async (req) => {
  const { 
    propertyAcknowledgementNumber,
    entityName,
    fundCluster,
    properties,
    amount,
    issuer,
    receiver
  } = await req.json();
  
  console.log(receiver)
  const date=new Date().toISOString()
  
  // const ptrDate = new Date();
  // const ptrMonth = ptrDate.getMonth() + 1
  // const ptrYear = ptrDate.getFullYear()

  // const ptr = `${ptrYear}-${("0"+ ptrMonth).slice(-2)}`
  try {
    await connectToDB();
    // const query = {
    //   $expr:{
    //     $eq:[{ $month: '$date'}, ptrMonth]
    //   }
    // }

    //format PTR number
    // const ptrCount = await PropertyAcknowledgement.countDocuments(query)
    // const finalPtrNumber = `${ptr}-${("000"+ptrCount).slice(-3)}`
    const newPropertyAcknowledgement = new PropertyAcknowledgement ({
        // propertyAcknowledgementNumber: finalPtrNumber,
        propertyAcknowledgementNumber,
        entityName,
        fundCluster,
        amount,
        date,
        properties,
        issuer,
        receiver
    });

    await newPropertyAcknowledgement.save();

    return new Response(JSON.stringify(newPropertyAcknowledgement), { status: 201 });
  } catch (error) {
    throw new Error ("Failed to create a new property acknowledgement document:" + error);
  }
};
