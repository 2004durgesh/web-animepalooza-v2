'use client';

import Image from 'next/image';
import React from 'react';
import NoSearchResults from '/public/assets/images/No-Search-Results.gif';
import { Button } from '@/components/ui/button';

const error = ({ error, reset }) => {
  console.log(error, 'from error.js');

  return (
    <div className='-mt-16 flex h-screen flex-col items-center justify-center bg-gray-900 text-center text-white'>
      <h1 className='mb-4 text-4xl font-bold'>
        Oops! Something Unexpected Occured.
      </h1>
      <p className='text-xl'>
        While Gojo and Yuji fight to bring it back, why not check out some other
        anime or movies,tv-shows?
      </p>
      <p>{JSON.stringify(error)}</p>
      <Image
        src={NoSearchResults}
        alt='Funky Image'
        width={500}
        height={281}
        className='mt-4 object-cover'
      />
      <Button
        className='mt-4 rounded-md bg-primary px-4 py-2 text-white'
        onClick={() => reset()}
      >
        Retry
      </Button>
    </div>
  );
};

export default error;
