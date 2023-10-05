import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from 'bcrypt'

export const POST = async (req) => {
    const {
        username,
        password
    } = await req.json();

    try{
        await connectToDB();
        const existingUser = await User.find({username})
        console.log(existingUser)
        if(existingUser || await bcrypt.compare(password, existingUser.password)){
            return new Response("Logged In", {status: 201});
        }
    }catch(error){
        return new Response("Invalid Credentials", { status: 500 });
    }
}