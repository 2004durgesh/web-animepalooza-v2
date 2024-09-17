import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';

const EpisodeListSidebar = ({ episodes = [], params, info,currentPlayingEpisodeId }) => {
    return (
        <aside>
            <div className="h-screen">
                <div className="flex flex-col gap-4">
                    {episodes && episodes.map((episode, index) => (
                        <Link key={episode.id}
                            href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/?title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episode-number=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}`}
                            className="overflow-hidden">
                            <Card className={`w-full h-40 ${episode.id === currentPlayingEpisodeId ? "border-red-500" : ""}`}> {/* Set fixed height for cards */}
                                <CardHeader className="flex-row items-center h-full">
                                    <div className='relative w-1/3 h-full'> {/* Set fixed width and height for images */}
                                        {(episode?.image ?? episode?.img) && <Image unoptimized src={episode?.image ?? episode?.img?.hd} alt={episode.title} layout="fill" className='object-cover' />} {/* Use layout="fill" for consistent image sizing */}
                                        <div className='absolute inset-0 bg-black/50'></div>
                                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"></path>
                                        </svg>
                                    </div>
                                    <CardContent className="w-2/3 h-full flex flex-col justify-center"> {/* Set fixed width for content */}
                                        <CardTitle className='text-sm font-bold font-pro-bold text-primary'>{episode?.title ?? info?.title?.english ?? info?.title}</CardTitle>
                                        {episode?.description &&
                                            <CardDescription className="line-clamp-2">
                                                {episode?.description}
                                                {episode?.id}
                                            </CardDescription>
                                        }
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default EpisodeListSidebar;