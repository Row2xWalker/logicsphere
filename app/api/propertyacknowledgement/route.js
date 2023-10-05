import { connectToDB } from "@utils/database";
import PropertyAcknowledgement from "@models/propertyAcknowledgement";

export const GET = async () => {
    try {
        await connectToDB();
        const propertyAcknowledgement = await PropertyAcknowledgement.find({}).populate("propertyAcknowledgementNumber")
        return new Response(JSON.stringify(propertyAcknowledgement), { status: 200 });
    }catch (error) {
        return new Response("Failed to fetch all documents", { status: 500 });
    }
}