import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Loading = () => {
  return (
    <>
      <div className='w-full p-4'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {Array.from({ length: 20 }).map((_, index) => (
            <Card
              key={index}
              className='h-[190px] w-[135px] overflow-hidden rounded-lg border-none shadow-lg xl:h-[265px] xl:w-[185px]'
            >
              <CardContent className='relative h-full p-0'>
                <Skeleton className='h-full w-full' />
                <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent p-4'>
                  <Skeleton className='mb-2 h-6 w-3/4' />
                  <Skeleton className='mb-2 h-3 w-full' />
                  <div className='flex justify-between'>
                    <Skeleton className='h-3 w-1/4' />
                    <Skeleton className='h-3 w-1/4' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
