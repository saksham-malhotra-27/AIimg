import { kv } from "@vercel/kv"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google 
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
    console.log(
      user.email
    )
    const gotuser = await kv.get(user.email !)
    if(!gotuser){
      const newuser = await kv.set(user.email!, {email:user.email!, images:[]});
      console.log(newuser)
    }
     return true;
    }
  }
});
