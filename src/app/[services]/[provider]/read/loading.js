import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  let arr = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
      {arr.map((_, i) => (
        <div
          key={i}
          className='flex flex-col items-center justify-center rounded shadow'
        >
          <Skeleton className='h-96 w-full' />
        </div>
      ))}
    </div>
  );
};

export default loading;
