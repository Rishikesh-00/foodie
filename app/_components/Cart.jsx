import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Cart({ cart }) {
    console.log(cart)
    const CalculateCartAmount=()=>{
        let total=0;
        cart.forEach((item) => {
            total=total+item.price;            ;
        });
        return total.toFixed(2);
    }
    return (
        <div>
            <h2 className='text-lg font-bold' >{cart[0]?.restaurant?.name}</h2>
            <div className='mt-5 flex flex-col gap-3'>
                <h2 className='font-bold' >My Order</h2>
                {
                    cart && cart.map((item, index) => (
                        <div className='flex justify-between gap-8 items-center' key={index} >
                            <div className='flex gap-2 items-center'>
                                <Image src={item.productImage} alt={item.productName} width={40} height={40} className='rounded-lg object-cover' />
                                <h2 className='text-sm'>{item?.productName} </h2>
                            </div>
                            <h2 className='font-bold flex gap-2 justify-center items-center'>Rs.{item.price}
                            <X className='h-4 w-4 text-red-500'/>
                            </h2>
                            

                        </div>
                    ))
                }
                <Button className='bg-orange-600 hover:bg-orange-500 outline-none'>Checkout Rs.{CalculateCartAmount()} </Button>
            </div>
        </div>
    )
}

export default Cart
