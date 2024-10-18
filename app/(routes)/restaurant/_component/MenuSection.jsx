import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { SquarePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner';
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';

function MenuSection({ restaurant }) {
    const [menuItemList, setMenuItemList] = useState([]);
    const {user}=useUser();
    const {updateCart,setUpdateCart} = useContext(CartUpdateContext);

    useEffect(() => {
        // Check if restaurant and its menu are available before attempting to filter
        if (restaurant?.restaurant?.menu) {
            filterMenu(restaurant.restaurant.menu[0]?.category);
        }
    }, [restaurant]);

    const filterMenu = (category) => {
        const result = restaurant?.restaurant?.menu?.filter((item) => item.category === category);

        if (result?.length > 0) {
            setMenuItemList(result[0]);
            // console.log(result[0]);
        }
    };

    const addToCartHandler=(item)=>{
        toast("Adding to cart!")
        console.log(restaurant?.restaurant.slug)
      const data={
        email:user?.primaryEmailAddress?.emailAddress,
        name:item?.name,
        description:item?.description,
        productImage:item?.productImage?.url,
        price:item?.price,
        restaurantSlug:restaurant?.restaurant.slug,
      }
      GlobalApi.AddToCart(data).then(res=>{
        // console.log(res);
        setUpdateCart(!updateCart)
        toast("Added to cart!")
      },(error)=>{
        console.log(error)
      })
    }

    // const addToCartHandler = (item) => {
    //     if (!user) {
    //       toast.error("Please log in to add items to your cart.");
    //       return;
    //     }
      
    //     const data = {
    //       email: user?.primaryEmailAddress?.emailAddress,
    //       name: item?.name,
    //       description: item?.description,
    //       productImage: item?.productImage?.url,
    //       price: item?.price,
    //     };
    //     console.log(data)
    //     GlobalApi.AddToCart(data).then(res => {
    //       console.log(res);
    //       toast.success("Added to cart!");
    //     }).catch(error => {
    //       console.error(error);
    //       toast.error("Failed to add to cart. Please try again.");
    //     });
    //   };
      

    return (

        <div>
            <div className="grid grid-cols-4 mt-2">
                <div className="hidden md:flex flex-col mr-10 gap-2">
                    {restaurant?.restaurant?.menu?.map((item, index) => (
                        <Button
                            variant="ghost"
                            key={index}
                            className="flex justify-start"
                            onClick={() => filterMenu(item.category)}
                        >
                            {item.category}
                        </Button>
                    ))}
                </div>
                <div className="md:col-span-3 col-span-4">
                    <h2 className="font-extrabold text-lg mb-5">{menuItemList.category}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {menuItemList?.menuItem?.map((item, index) => (
                            <div
                                key={index}
                                className="p-2 flex gap-3 border rounded-xl items-center hover:border-orange-600 hover:bg-orange-50 cursor-pointer"
                            >
                                <Image
                                    src={item?.productImage?.url}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                    className="object-cover w-[120px] h-[120px] rounded-xl"
                                />
                                <div className="flex flex-col gap-1">
                                    <h2 className="font-bold">{item.name}</h2>
                                    <h2>{item.price}</h2>
                                    <h2 className="text-sm text-gray-400 line-clamp-2">{item.description}</h2>
                                    <SquarePlus className='cursor-pointer' onClick={()=>addToCartHandler(item)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuSection;
