import React from 'react'
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import parse from 'html-react-parser';
import { Badge } from '@/components/ui/badge';

const page = async ({ params }) => {
    const info = await fetchData('meta', 'anilist', `data/${params.info_id[0]}`, { provider: params.provider })
    // console.log(info);
    return (
        <>
            <div style={{
                backgroundImage: `url(${info.cover})`
            }}
                className='h-96 bg-cover bg-center bg-no-repeat'
            >
                <div className='backdrop-blur-md h-96 w-full flex items-center justify-center px-4'>
                    <div className='self-end my-4'>
                        <h1 className='font-bold text-2xl pro-bold inline'>{info.title.english}</h1>
                        <div className='flex'>
                            <span>{info.type}</span>
                            <span className='px-2'>•</span>
                            <span>{info.releaseDate}</span>
                            <span className='px-2'>•</span>
                            <span>{info.totalEpisodes}</span>
                        </div>
                    </div>
                    <Image src={info.image} alt={info.title.english} height={284} width={203} className='mx-auto h-full w-auto' />
                    <div className='self-end my-4'>
                        <div className='flex'>
                            <span>{info.status}</span>
                            <span className='px-2'>•</span>
                            <span>{(info.rating) / 10}</span>
                            <span className='px-2'>•</span>
                            <span>{info.duration}</span>
                        </div>
                        {info.genres.map((genre, index) => {
                            return (
                                <Badge variant="outline" key={index} className='flex-wrap flex m-1 text-white'>{genre}</Badge>
                            )

                        })}
                    </div>
                </div>
            </div>
            <h1 className='font-bold text-xl pro-bold'>Description: </h1>
            <span className='pro-regular text-sm sm:text-lg'>{parse(info.description)}</span>
        </>
    )
}

export default page