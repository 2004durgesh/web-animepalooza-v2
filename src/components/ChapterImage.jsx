import Image from 'next/image'
import React from 'react'

const ChapterImage = ({chapterPages}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {chapterPages.map((page, index) => (
          <div key={index} className='flex flex-col items-center justify-center shadow rounded'>
            <div className='flex items-center justify-center overflow-hidden rounded'>
              <Image unoptimized src={page.img} alt={`page-${page.page}`} height={384} width={500} objectFit='contain' />
            </div>
            <span className='text-center mb-4'>Page number: {page.page}</span>
          </div>
        ))}
      </div>
  )
}

export default ChapterImage