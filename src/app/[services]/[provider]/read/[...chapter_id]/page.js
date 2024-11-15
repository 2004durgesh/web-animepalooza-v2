import fetchData from '@/lib/Datafetcher';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Loading from '../loading';

const ReadPage = async ({ params }) => {
  const chapterPages = await fetchData('meta', 'anilist-manga', `read`, {
    chapterId: params.chapter_id,
    provider: params.provider,
  });

  return (
    <>
      {/* <div>{JSON.stringify(params)}</div> */}
      <Suspense fallback={<Loading />}>
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
          {chapterPages.map((page, index) => (
            <div key={index} className='flex flex-col items-center justify-center rounded shadow'>
              <div className='flex items-center justify-center overflow-hidden rounded'>
                <Image
                  unoptimized
                  src={page.img}
                  alt={`page-${page.page}`}
                  height={384}
                  width={500}
                  objectFit='contain'
                />
              </div>
              <span className='mb-4 text-center'>Page number: {page.page}</span>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default ReadPage;
