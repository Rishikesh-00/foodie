'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
// import React from 'react'
import React, { useEffect , useState} from 'react'
import Intro from '../_component/Intro.jsx';
import RestroTabs from '../_component/RestroTabs.jsx';

export default function RestaurantDetails() {
    const param=usePathname();
    const [restaurant,setRestaurant]=useState([]);
    useEffect(()=>{
        GetRestaurantDetail(param.split("/")[2])
    },[])
    const GetRestaurantDetail=(restroSlug)=>{
        GlobalApi.GetBusinessDetails(restroSlug).then(res=>{
            setRestaurant(res)
        })
    }

  return (
    <div className="mt-32 px-12">
        <Intro restaurant={restaurant} />
        <RestroTabs restaurant={restaurant} />
    </div>
  )
}
