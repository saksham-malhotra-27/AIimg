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
    <div>
     <Logout/>
    </div>
  )
}

export default page