'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import BusinessItemSkeleton from './BusinessItemSkeleton';

export default function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState('all');
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedCategory = params.get('category') || 'all';
    setCategory(selectedCategory);
    getBusinessList(selectedCategory);
  }, [params]);

  const getBusinessList = (category_) => {
    setLoading(true); // Set loading to true while fetching data
    GlobalApi.GetBusiness(category_).then(res => {
      setBusinessList(res?.restaurants || []);
      setLoading(false);
    });
  }

  return (
    <div className='mt-5 px-20'>
      <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
      <h2 className='font-bold text-orange-600'>{businessList.length} Results </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3'>
        {!loading ?
          businessList.map((restaurant, index) => (
            <BusinessItem key={index} business={restaurant} />
          )) :
          [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <BusinessItemSkeleton key={index} />
          ))
        }
      </div>
    </div>
  )
}
