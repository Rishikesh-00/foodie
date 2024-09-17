'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';

export default function BusinessList() {
    const params=useSearchParams();
    const [category,setCategory]=useState('all');
    const[businessList,setBusinessList]=useState([]);
    useEffect(()=>{
        params&&setCategory(params.get('category'));
        params&&getBusinessList(params.get('category'))
    },[params])

    const getBusinessList=(category_)=>{
        GlobalApi.GetBusiness(category_).then(res=>{
            setBusinessList(res?.restaurants)
            console.log(res.restaurants[0].banner.url)
        })
    }
  return (
    
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
      <h2 className='font-bold text-orange-600'>{businessList.length} Results </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7 mt-3'>
        {
            businessList.map((restaurants,index)=>(
                <BusinessItem key={index} business={restaurants}/>
            ))
        }
      </div>
    </div>
  )
}
