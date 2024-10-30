"use client"
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';
import { encryptData } from './crypto';

const EpisodeListSidebar = ({ episodes = [], params, info, currentPlayingEpisodeId, seasonNumber }) => {
    const currentPlayingRef = useRef(null);

    useEffect(() => {
        if (currentPlayingRef.current) {
            currentPlayingRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
    }, [currentPlayingEpisodeId]);
    return (
        <aside className=''>
            <ScrollArea className="h-[50vh] md:h-screen">
                <div className="flex flex-col gap-4">
                    {episodes && episodes.map((episode, index) => {
                        const queryParams = `title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episodeNumber=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}&seasonNumber=${encodeURIComponent(seasonNumber) || ''}`;

                        const encryptedParams = encryptData(queryParams, process.env.NEXT_PUBLIC_CRYPTO_KEY);
                        return <Link key={episode.id}
                            href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/${info?.mappings?.tmdb}?data=${encodeURIComponent(encryptedParams)}`}
                            className="overflow-hidden">
                            <Card
                                ref={episode.id === currentPlayingEpisodeId ? currentPlayingRef : null}
                                className={`w-full ${episode.id === currentPlayingEpisodeId ? "border-red-500" : ""}`}>
                                <CardHeader className="flex-row items-center p-2">
                                    {(episode?.image ?? episode?.img) &&
                                        <div className='relative w-1/3 h-full'>
                                            <Image
                                                unoptimized
                                                src={episode?.image ?? episode?.img?.hd}
                                                onError={(e) => {
                                                    e.target.src = "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg";
                                                }}
                                                alt={episode.title} width={100} height={50} className='object-cover w-auto h-auto aspect-[4/3]' />
                                            <div className='absolute inset-0 bg-black/50'></div>
                                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }}>
                                                <path stroke-linecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                <path stroke-linecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"></path>
                                            </svg>
                                        </div>}
                                    <CardContent className="w-2/3 h-full flex flex-col justify-center">
                                        <CardTitle className='text-sm font-bold font-pro-bold text-primary'>{episode?.title ?? info?.title?.english ?? info?.title}</CardTitle>
                                        {episode?.description &&
                                            <CardDescription className="line-clamp-3">
                                                {episode?.description}
                                            </CardDescription>
                                        }
                                    </CardContent>
                                </CardHeader>
                                <CardFooter className='grid grid-cols-2 mx-2'>
                                    {(episode?.number ?? episode?.episode) && <CardDescription className='text-white'>EP: {episode?.number ?? episode?.episode}</CardDescription>}
                                    {(episode?.season) && <CardDescription className='text-white'>SS: {episode?.season}</CardDescription>}
                                </CardFooter>
                            </Card>
                        </Link>
                    })}
                </div>
            </ScrollArea>
        </aside >
    );
};

export default EpisodeListSidebar;