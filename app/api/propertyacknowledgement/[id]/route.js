import { connectToDB } from "@utils/database";
import PropertyAcknowledgement from "@models/propertyAcknowledgement";

export const GET = async({params})=>{
    try{
        await connectToDB();

        const propertyAcknowledgement = await PropertyAcknowledgement.findById(params.id).populate("entityName");
        if(!propertyAcknowledgement) return new Response ("Document not found", {status:404});

        return new Response(JSON.stringify(propertyAcknowledgement), {status:200});
    }catch(error){
        return new Response("Failed to fetch this document", {status:500});
    }
}

export const PATCH = async(request,{params}) => {
    const{
        propertyAcknowledgementNumber,
        entityName,
        fundCluster,
        fromAccountableOfficer,
        toAccountableOfficer,
        properties,
        issuer,
        receiver
    } = await request.json();

    try{
        await connectToDB();

        const existingPropertyAcknowledgement = await PropertyAcknowledgement.findById(params.id)
        if(!existingPropertyAcknowledgement) return new Response("Document not found", {status:404});
          
        existingPropertyAcknowledgement.propertyAcknowledgementNumber = propertyAcknowledgementNumber,
        existingPropertyAcknowledgement.entityName = entityName,
        existingPropertyAcknowledgement.fundCluster = fundCluster,
        existingPropertyAcknowledgement.fromAccountableOfficer = fromAccountableOfficer,
        existingPropertyAcknowledgement.toAccountableOfficer = toAccountableOfficer
        existingPropertyAcknowledgement.properties = properties,
        existingPropertyAcknowledgement.issuer = issuer,
        existingPropertyAcknowledgement.receiver= receiver

        await existingPropertyAcknowledgement.save();

        return new Response(JSON.stringify(existingPropertyAcknowledgement, {status:200}))
    }catch(error){
        return new Response("Failed to update this document", {status:500});
    }
}

export const DELETE = async (req, { params }) => {
    try {
      await connectToDB();
      await PropertyAcknowledgement.findByIdAndRemove(params.id);
  
      return new Response("Document deleted successfully", { status: 200 });
    } catch (error) {
      return new Response("Failed to delete document", { status: 500 });
    }
  };
  