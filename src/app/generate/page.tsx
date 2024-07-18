import React from 'react'
import { auth } from '../auth';
import { redirect } from 'next/navigation';
async function page() {
  const session = await auth();
    if(!session?.user){
        redirect('/');
    }
  return (
    <div>generate</div>
  )
}

export default page