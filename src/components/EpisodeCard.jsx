"use client"
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import { encryptData } from "./crypto"

const EpisodeCard = ({ episodes = [], params, info, seasonNumber }) => {

    return (
        <section className='my-4'>
            <h2 className='text-lg font-semibold font-pro-medium text-primary'>Episodes</h2>
            <ScrollArea>
                <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 `}>
                    {episodes && episodes?.map((episode, index) => {
                        const queryParams = `title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episodeNumber=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}&seasonNumber=${encodeURIComponent(seasonNumber) || ''}`;

                        const encryptedParams = encryptData(queryParams, process.env.NEXT_PUBLIC_CRYPTO_KEY);
                        return <Card key={episode.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                            <CardHeader>
                                <Link
                                    href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/${info?.mappings?.tmdb}?data=${encodeURIComponent(encryptedParams)}`}
                                    className="overflow-hidden">
                                    {(episode?.image ?? episode?.img) && <div className='relative hover:scale-110 active:scale-90 transition-all duration-300'>
                                        <Image
                                            unoptimized
                                            src={episode?.image ?? episode?.img?.hd}
                                            onError={(e) => {
                                                e.target.src = "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg";
                                            }}
                                            alt={episode.title} width={526} height={296} className='mx-auto aspect-video object-cover bg-red-500' />
                                        <div className='absolute inset-0 bg-black/50'></div>
                                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }}>
                                            <path stroke-linecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            <path stroke-linecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"></path>
                                        </svg>
                                    </div>}
                                </Link>
                                <CardTitle className='px-2 text-sm font-bold font-pro-bold text-primary line-clamp-1'>{episode?.title ?? info?.title?.english ?? info?.title}</CardTitle>
                            </CardHeader>
                            {episode?.description && <CardContent>
                                <CardDescription className="line-clamp-2">
                                    {episode?.description}
                                </CardDescription>
                            </CardContent>}
                            <CardFooter className='grid grid-cols-2 mx-2'>
                                {(episode?.number ?? episode?.episode) && <CardDescription className='text-white'>EP: {episode?.number ?? episode?.episode}</CardDescription>}
                                {(episode?.season) && <CardDescription className='text-white'>SS: {episode?.season}</CardDescription>}
                                {episode?.createdAt && <CardDescription className='text-white'>{new Date(episode?.createdAt).toLocaleDateString()}</CardDescription>}
                                {episode?.releaseDate && <CardDescription className='text-white'>{new Date(episode?.releaseDate).toLocaleDateString()}</CardDescription>}
                                <Link
                                    href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/${info?.mappings?.tmdb}?data=${encodeURIComponent(encryptedParams)}`}
                                    className="text-white hover:underline transition-all duration-300 active:animate-ping"
                                >Watch Now
                                </Link>
                            </CardFooter>
                        </Card>
                    })}
                </div>
            </ScrollArea>
        </section>
    )
}

export default EpisodeCard