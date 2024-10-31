'use client';
import React from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import Error404 from '../../public/assets/lottie/404-error.json';
const NotFound = () => {
  return (
    <>
      <div className='relative flex h-[50vh] w-screen items-center justify-center'>
        <div className=''>
          <Lottie animationData={Error404} loop={true} />
        </div>
        <Link href='/' className='absolute font-pro-bold text-4xl text-black'>
          Return Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
