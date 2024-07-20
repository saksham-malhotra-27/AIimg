"use server"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, signIn } from '@/app/auth';
import { redirect } from 'next/navigation';
interface NavProps {
  isAuthenticated: boolean;
}

export const Nav: React.FC= async () => {
  const session = await auth();
  const isAuthenticated= session?.user
  
  return (
    <>
    <h1 className='text-center w-full bg-purple-600'> 
     {!isAuthenticated?" LOGIN TO EXPLORE":"TYPE & SEE"}
    </h1>
    <nav className="sticky top-0 z-50 h-16  w-full flex flex-row justify-around items-center space-x-4 p-4 text-xl font-extralight bg-stone-950 bg-opacity-75 text-white">
      <Link href="/"  >
        <span className={`cursor-pointer hover:text-slate-200`}>Home</span>
      </Link>
      {isAuthenticated ? (<>
      <Link href="/explore">
        <span className={`cursor-pointer hover:text-slate-200 `}>Explore</span>
      </Link>
      <Link href="/generate/new">
        <span className={`cursor-pointer hover:text-slate-200 `}>Generate</span>
      </Link>
        <Link href="/profile" >
          <span className={`cursor-pointer hover:text-slate-200`}>Profile</span>
        </Link>
        
        </>
      ) : (<>
        <form
        action={async () => {
          "use server"
          await signIn("google", {redirectTo:'/'})
        }}
      >
        <button type="submit" className=" bg-red-500 px-2 rounded-2xl text-center">Signin</button>
      </form>
      </>
      )}
    </nav>
    </>
  );
};



 
