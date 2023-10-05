import { connectToDB } from "@utils/database";
import PropertyTransfer from "@models/propertyTransfer";

export const GET = async () => {
    try {
        await connectToDB();

        const propertyTransfer = await PropertyTransfer.find({}).populate("propertyTransferNumber")

        return new Response(JSON.stringify(propertyTransfer), { status: 200 });
    }catch (error) {
        return new Response("Failed to fetch all documents", { status: 500 });
    }
}