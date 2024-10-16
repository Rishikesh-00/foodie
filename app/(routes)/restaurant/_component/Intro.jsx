'use client'
import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

function Intro({ restaurant }) {
  const bannerUrl = restaurant?.restaurant?.banner?.url;

  return (
    <div className="">
      {bannerUrl ? (
        <Image
          src={bannerUrl}
          width={1000}
          height={300}
          className="w-full h-[220px] object-cover rounded-xl"
          alt={`${restaurant?.restaurant?.name} Banner`}
        />
      ) : (
        <div className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
      )}
      <h2 className="text-3xl font-bold mt-2 ">{restaurant?.restaurant?.name}</h2>
      <div className="flex items-center gap-2 mt-2" >
        <Image src="/star.png" alt='star' width={20} height={20} />
        <label className="text-gray-500" >4.5 (56)</label>
      </div>
      <h2 className="text-gray-500 mt-2 flex gap-2 items-center" > <MapPin/> {restaurant?.restaurant?.address} </h2>

    </div>
  );
}

export default Intro;
