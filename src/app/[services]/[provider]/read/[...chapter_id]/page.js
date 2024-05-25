import ChapterImage from '@/components/ChapterImage';
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import React, { Suspense } from 'react'
import Loading from '../loading';

const page = async ({ params }) => {

  const chapterPages = await fetchData("meta", "anilist-manga", `read`, { chapterId: params.chapter_id, provider: params.provider })
  return (
    <>
      {/* <div>{JSON.stringify(params)}</div> */}
      <Suspense fallback={<Loading />}>
        <ChapterImage chapterPages={chapterPages} />
      </Suspense>
    </>
  )
}

export default page