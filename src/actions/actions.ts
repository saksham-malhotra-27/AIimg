'use server';

import { signOut } from "@/app/auth";
import { kv } from "@vercel/kv";

export const getuser = async ()=> {
    
}

export const putuser = async ()=>{

}

export const handleLogout = async ()=>{
await signOut();
}