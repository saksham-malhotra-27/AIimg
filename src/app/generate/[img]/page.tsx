import React from 'react'
import Generate from '../Generate'
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
async function Page() {
  const session = await auth();
  if(!session?.user){
    redirect('/')
  }
  return (
    <div>
      <Generate/>
    </div>
  )
}

export default Page