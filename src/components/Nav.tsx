"use server"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, signOut } from '@/app/auth';
import { redirect } from 'next/navigation';
interface NavProps {
  isAuthenticated: boolean;
}

export const Nav: React.FC= async () => {
  const session = await auth();
  const isAuthenticated= session?.user
  return (
    <nav className="sticky top-0 z-50 h-16  w-full flex flex-row justify-around items-center space-x-4 p-4 text-xl font-extralight bg-stone-950 bg-opacity-75 text-white">
      <Link href="/explore">
        <span className={`cursor-pointer hover:text-slate-200 `}>Explore</span>
      </Link>
      <Link href="/"  >
        <span className={`cursor-pointer hover:text-slate-200`}>Home</span>
      </Link>
      <Link href="/generate" >
        <span className={`cursor-pointer hover:text-slate-200 `}>Generate</span>
      </Link>
      {isAuthenticated ? (
        <>
        <Link href="/profile" >
          <span className={`cursor-pointer hover:text-slate-200`}>Profile</span>
        </Link>
        
        </>
      ) : (
        <Link href='/login'>
          <span className={`cursor-pointer `}>Login</span>
        </Link>
      )}
    </nav>
  );
};



 
