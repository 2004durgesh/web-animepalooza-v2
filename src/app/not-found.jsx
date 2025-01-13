'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="h-64 w-64 animate-pulse bg-gray-200 rounded-lg" />
});

const Error404 = require('../../public/assets/lottie/404-error.json');

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 '>
      <div className='relative w-full max-w-lg'>
        <Suspense fallback={<div className="h-64 w-64 animate-pulse rounded-lg" />}>
          <Lottie animationData={Error404} loop={true} />
        </Suspense>
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-pro-bold  mb-2">
          Page Not Found
        </h1>
        <p className=" text-gray-300 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href='/' 
          className='inline-block mt-8 rounded-lg bg-primary px-8 py-4 font-pro-bold text-2xl text-white transition-all 
          hover:bg-primary/90 hover:shadow-lg active:scale-95 transform hover:-translate-y-1'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;