'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {
  // State for each input field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');

  const [loading,setLoading]=useState(false);
  const params = useSearchParams();
  const [cart, setCart] = useState([])
  const [subTotal,setSubTotal]=useState(0)                       
  const [deliveryAmount,setDeliveryAmount]= useState(35);
  const [tax,setTax]= useState(0);
  const [total,setTotal]= useState(0);
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const {user}=useUser();

  useEffect(() => {
    console.log(params.get('restaurant'));
    user&&GetUserCart();
  }, [user||updateCart]);

  const GetUserCart = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress)
        .then(res => {
          setCart(res.userCarts);
          console.log(res?.userCarts);
          calculateTotalAmount(res?.userCarts);
        })
        .catch(error => console.error("Failed to fetch user cart:", error));
    }

    
  };

  const calculateTotalAmount=(cart_)=>{
    let total=0;
    cart_.forEach((item)=>{
      total=total+item.price;
    })
    setSubTotal(total.toFixed(2))
    setTax((total*0.09).toFixed(2))
    setTotal(total+total*0.09+deliveryAmount)
  }


  const addToOrder=()=>{
    setLoading(true)
    const data={
      email:user.primaryEmailAddress.emailAddress,
      orderAmount:total,
      restaurantName:params.get('restaurant'),
      userName:username,
      phone:phone,
      zipCode:zip,
      address:address,
    }
    GlobalApi.CreateNewOrder(data).then(res=>{
     const resultId= (res?.createOrder?.id);
      if(resultId){
        cart.forEach((item)=>{
          GlobalApi.UpdateOrderToAddOrderItem(item.productName,item.price,resultId,user?.primaryEmailAddress.emailAddress)
          .then(result=>{
            console.log(result);
            setLoading(false)
            toast("Order created successfylly!");
            setUpdateCart(!updateCart)
          },(err)=>{
            setLoading(false)
          })
        })
      }
    },(err)=>{
      setLoading(false)
    })
  }
  return (
    <div className='mt-32'>
      <h2 className='font-bold text-2xl my-5 ml-20'>Checkout</h2>
      {/* Set the grid layout with custom column spans */}
      <div className='p-5 md:px-20 grid grid-cols-1 md:grid-cols-5 gap-10'>
        
        {/* Billing Details Section - takes more space with col-span-3 */}
        <div className='md:col-span-3'>
          <h2 className='font-bold text-3xl'>Billing Details</h2>
          <div className='font-bold grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='font-bold grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>

        {/* Total Summary Section - takes less space with col-span-2 */}
        <div className='md:col-span-2 border p-5 rounded-md'>
          <h2 className='p-3 rounded-md bg-gray-200 font-bold text-center'>Total Cart ({cart?.length})</h2>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className='font-bold'>Subtotal</h2> <span>Rs. {subTotal}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2>Delivery</h2><span>Rs. {deliveryAmount}</span>
            </div>
            <div className="flex justify-between">
              <h2>GST (9%)</h2><span>Rs. {tax} </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2 className='font-bold'>Total</h2><span>Rs. {total.toFixed(2)}</span>
            </div>
            <div>
              <Button className="bg-orange-600 w-full hover:bg-orange-500" onClick={()=>addToOrder()}>
                {
                  loading?<Loader className='animate-spin'/>:'Make Payment'
                }
                
                </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout;
