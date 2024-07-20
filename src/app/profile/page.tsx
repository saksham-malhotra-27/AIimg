"use server"
import React from 'react'
import Logout from '../logout'
import { auth, signOut } from '../auth'
import { redirect } from 'next/navigation';

async function page() {
  const session = await auth();
  if(!session?.user){
    redirect('/')
  }

  return (
    <div className='h-full  flex flex-col justify-center items-center'>
      <h1>
       You are logged in by  {session.user.email}
      </h1>
      <Logout/>
    </div>
  )
}

export default page