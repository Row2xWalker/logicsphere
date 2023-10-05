import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from 'bcrypt'
export const GET = async ({params}) => {
    try{
        await connectToDB();

        const user = await User.findById(params.id).populate("username")
        if(!user) return new Response("User not found", {status: 404})

        return new Response(JSON.stringify(user), {status:200});
    }catch(error){
        return new Response("Failed to fetch user", {status: 500});
    }
}

export const PATCH = async(req ,{params}) => {
    const{
        name,
        password,
        isAdmin,
        status
    } = await req.json();

    try{
        await connectToDB();

        const existingUser = await User.findById(params.id)
        if(!existingUser) return new Response("User not found", {status:404});
          
        if(await bcrypt.compare(password, existingUser.password)){
            existingUser.password = password
        }
        existingUser.name = name,
        existingUser.isAdmin = isAdmin,
        existingUser.status = status

        await existingUser.save();

        return new Response(JSON.stringify(existingUser, {status:200}))
    }catch(error){
        return new Response("Failed to update this user", {status:500});
    }
}

export const DELETE = async (req, { params }) => {
    try {
      await connectToDB();
      await User.findByIdAndRemove(params.id);
  
      return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
      return new Response("Failed to delete user" + error.message, { status: 500 });
    }
  };
  