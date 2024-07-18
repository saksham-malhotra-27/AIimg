"use client"
import React from 'react'
import { signOut } from './auth'
import { handleLogout } from '@/actions/actions'
function logout() {
  return (
    <button onClick={()=>{
        handleLogout()
      }}>
      <span className={`cursor-pointer hover:text-slate-200`}>Logout</span>
      </button>
  )
}

export default logout