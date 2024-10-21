import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { CartUpdateContext } from '../_context/CartUpdateContext'

function Cart({ cart }) {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    console.log(cart.length)
    const CalculateCartAmount = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });
        return total.toFixed(2);
    }

    const RemoveItemFromCart = (id) => {
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(res => {
            if (res) {
                GlobalApi.DeleteItemFromCart(id).then(res => {
                    console.log(res);
                    toast("Item removed!");
                    setUpdateCart(!updateCart); // Toggle the cart update state
                });
            }
        }).catch(err => console.error("Error removing item:", err));
    }

    
    // if(cart.length>0)
    return (
        <div>
            <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
            <div className='mt-5 flex flex-col gap-3'>
                <h2 className='font-bold'>My Order</h2>
                {
                    cart && cart.map((item, index) => (
                        <div className='flex justify-between gap-8 items-center' key={index}>
                            <div className='flex gap-2 items-center'>
                                <Image src={item.productImage} alt={item.productName} width={40} height={40} className='rounded-lg object-cover' />
                                <h2 className='text-sm'>{item?.productName}</h2>
                            </div>
                            <h2 className='font-bold flex gap-2 justify-center items-center'>Rs.{item.price}
                                <X className='h-4 w-4 cursor-pointer text-red-500' onClick={() => RemoveItemFromCart(item.id)} />
                            </h2>
                        </div>
                    ))
                }
                <Button className='bg-orange-600 hover:bg-orange-500 outline-none'>
                    Checkout Rs.{CalculateCartAmount()}
                </Button>
            </div>
        </div>
    )
   
}

export default Cart
