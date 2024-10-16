'use client'
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CategoryList() {
  const listRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const categoryParam = params.get('category') || 'all';
    setSelectedCategory(categoryParam);
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Fetches category list
  const getCategoryList = () => {
    GlobalApi.GetCategory().then(resp => {
      setCategoryList(resp.categories);
      console.log(resp.categories);
    });
  };

  const ScrollRightHandler = () => {
    listRef.current.scrollBy({
      left: 200,
      behavior: "smooth"
    });
  };

  const ScrollLeftHandler = () => {
    listRef.current.scrollBy({
      left: -200,
      behavior: "smooth"
    });
  };

  return (
    <div className='px-10 relative'>
      <div className='flex gap-4 overflow-auto scrollbar-hide' ref={listRef}>
        
        {/* Render the other categories */}
        {categoryList && categoryList.map((category, index) => (
          <Link href={`?category=${category.slug}`} key={index} className={`flex flex-col items-center gap-2 border-2 p-3 rounded-xl min-w-28 hover:border-orange-600 hover:bg-orange-50 cursor-pointer group ${selectedCategory === category.slug && 'text-orange-500 border-orange-600 bg-orange-50'}`}>
            <img className='w-10 group-hover:scale-110 transition-all duration-300' src={category.icon?.url} alt={category.name} />
            <h2 className='font-medium text-sm group-hover:text-red-400'>{category.name}</h2>
          </Link>
        ))}
      </div>

      {/* Left Arrow */}
      <ArrowLeftCircle 
        onClick={ScrollLeftHandler} 
        className='absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer' 
      />

      {/* Right Arrow */}
      <ArrowRightCircle 
        onClick={ScrollRightHandler} 
        className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer' 
      />
    </div>
  )
}
