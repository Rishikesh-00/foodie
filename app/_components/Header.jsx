'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingCart } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import GlobalApi from '../_utils/GlobalApi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart'


export default function Header() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([])
  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      user && GetUserCart();
    }
  }, [updateCart && user, isLoaded]);


  const GetUserCart = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress)
        .then(res => {
          setCart(res.userCarts);
          console.log(res?.userCarts)
        }

        )
        .catch(error => console.error("Failed to fetch user cart:", error));
    }
  };

  if (!isLoaded) return null;

  return (
    <div className='z-50 bg-white flex justify-between border-b-2 items-center p-6 md:px-20 shadow-sm fixed w-full top-0 left-0'>
      <img src='/FoodieLogo.png' alt="logo" width={200} height={200} />
      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <input type="text" placeholder='Search...' className='bg-transparent w-full outline-none' />
        <Search />
      </div>
      {isSignedIn ? (
        <div className='flex gap-3'>
          
          <Popover>
            <PopoverTrigger asChild>
            <div className='flex cursor-pointer'>
            <ShoppingCart />
            <span className='text-sm  h-7 w-7 flex justify-center items-center rounded-full bg-slate-200'>{cart?.length}</span>
          </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Cart  cart={cart}/>
            </PopoverContent>
          </Popover>


          <UserButton />
        </div>
      ) : (
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button className="bg-orange-600 hover:bg-orange-500">Sign up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}
