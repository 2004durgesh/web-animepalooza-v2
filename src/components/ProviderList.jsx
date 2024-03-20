"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const ProviderList = ({name,description,imgSrc,slug}) => {
  console.log(imgSrc);
  const pathname = usePathname();
  const href = `${pathname}${slug}`;
  // console.log(pathname);
  return (
    <Link href={href} className="p-4">
      <div className="border-b hover:scale-105 active:scale-90 duration-200 gap-4 mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              alt={name}
              className="h-24 w-24 rounded-full bg-yellow-300 aspect-square"
              height="100"
              width="100"
              src={imgSrc}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-lg w-full">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProviderList