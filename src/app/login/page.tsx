import React from 'react'
import { SignIn } from '../signIn'
import { auth } from '../auth'
import { redirect } from 'next/navigation';
async function page() {
    const session = await auth();
    if(session?.user){
        redirect('/');
    }
  return (
    <div>
        <SignIn/>
    </div>
  )
}

export default page