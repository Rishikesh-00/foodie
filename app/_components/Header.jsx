'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

export default function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className=' flex justify-between border-b-2 items-center p-6 md:px-20 shadow-sm fixed w-full top-0 left-0'>
      <img src='/FoodieLogo.png' alt="logo" width={200} height={200} />
      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <input type="text" placeholder='Search...' className='bg-transparent  w-full outline-none' />
        <Search></Search>
      </div>
      {isSignedIn ? <UserButton /> :
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
            <Button variant="outline">Login</Button></SignInButton>
          <SignUpButton mode='modal'><Button className="bg-orange-600 hover:bg-orange-500">Sign up</Button></SignUpButton>

        </div>
      }

    </div>
  )
}
