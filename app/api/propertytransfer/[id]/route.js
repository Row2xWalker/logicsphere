import { connectToDB } from "@utils/database";
import PropertyTransfer from "@models/propertyTransfer";

export const GET = async({params})=>{
    try{
        await connectToDB();

        const propertyTransfer = await PropertyTransfer.findById(params.id).populate("entityName");
        if(!propertyTransfer) return new Response ("Document not found", {status:404});

        return new Response(JSON.stringify(propertyTransfer), {status:200});
    }catch(error){
        return new Response("Failed to fetch this document", {status:500});
    }
}

export const PATCH = async(request,{params}) => {
    const{
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
    } = await request.json();

    try{
        await connectToDB();

        const existingPropertyTransfer = await PropertyTransfer.findById(params.id)
        if(!existingPropertyTransfer) return new Response("Document not found", {status:404});
          
        existingPropertyTransfer.propertyTransferNumber= propertyTransferNumber,
        existingPropertyTransfer.entityName = entityName,
        existingPropertyTransfer.fundCluster = fundCluster,
        existingPropertyTransfer.fromAccountableOfficer = fromAccountableOfficer,
        existingPropertyTransfer.toAccountableOfficer = toAccountableOfficer,
        existingPropertyTransfer.transferType = transferType,
        existingPropertyTransfer.transferReason = transferReason,
        existingPropertyTransfer.properties = properties,
        existingPropertyTransfer.approver = approver,
        existingPropertyTransfer.issuer = issuer,
        existingPropertyTransfer.receiver= receiver

        await existingPropertyTransfer.save();

        return new Response(JSON.stringify(existingPropertyTransfer, {status:200}))
    }catch(error){
        return new Response("Failed to update this document", {status:500});
    }
}

export const DELETE = async (req, { params }) => {
    try {
      await connectToDB();
      await PropertyTransfer.findByIdAndRemove(params.id);
  
      return new Response("Document deleted successfully", { status: 200 });
    } catch (error) {
      return new Response("Failed to delete document", { status: 500 });
    }
  };
  