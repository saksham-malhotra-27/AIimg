import React from 'react'
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import Explore from './explore';
async function page() {
  const session = await auth();
    if(!session?.user){
        redirect('/');
    }
  return (
    <div>
      <Explore/>
    </div>
  )
}

export default page

