import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from 'bcrypt'

export const POST = async (req) => {
    const {
        username,
        name,
        password,
        isAdmin,
        status,
        logStatus,
    } = await req.json();

    const newPassword = await bcrypt.hash(password, 10);
    try{
        await connectToDB();
        const dateCreated = new Date().toISOString();
        const newUser = new User({
            username,
            name,
            password: newPassword,
            dateCreated
        })

        await newUser.save();
        return new Response(JSON.stringify(newUser, {status: 201}));
    }catch(error){
        return new Response("Failed to create a new User", { status: 500 });
    }
}