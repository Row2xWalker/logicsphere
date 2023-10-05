import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async() =>{
    try{
        await connectToDB();
        const users = await User.find({}).populate("username").select("-password")
        
        return new Response(JSON.stringify(users), {status:200})
    }catch(error){
        return new Response("Failed to retrieve users", {status:500})
    }
}