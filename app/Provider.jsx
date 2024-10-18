"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { CartUpdateContext } from './_context/CartUpdateContext'

export default function Provider({children}) {
  const[updateCart,setUpdateCart]=useState(false);
  return (
    <CartUpdateContext.Provider value={{updateCart,setUpdateCart}}>
    <div>
      <Header></Header>
      <Toaster/>
      {children}
    </div>
    </CartUpdateContext.Provider>
  )
}
