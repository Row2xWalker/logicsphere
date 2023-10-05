import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "@utils/database";
import User from "@models/user";
import bcrypt from 'bcrypt';

export const authOptions = {
  session:{
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          // username: { label: "Username", type: "text", placeholder: "Username" },
          // password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          const {username, password} = credentials

          try{
            await connectToDB();
            const user = await User.findOne({username})
            if (!user) return null;

            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch) return null;
            
            return user
          }catch(error){
            console.log("Error: ",error)
          }
        }
      })
    ],
    pages:{
      signIn:"/login",
    }
    // callbacks:{
    //   jwt(params){
    //     if(params.user){
    //       params.token.isAdmin = params.user.isAdmin
    //       params.token.id = params.user.id
    //     }

    //     return params.token
    //   },
    //   session({session, token}){
    //     if(session.user){
    //       session.user.id = token.id,
    //       session.user.isAdmin = token.isAdmin
    //     }
    //     return session
    //   }
    // }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }