'use client';
import Link from 'next/link';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { encryptData } from './crypto';

const EpisodeCard = ({ episodes = [], params, info, seasonNumber }) => {
  return (
    <section className='my-4'>
      <h2 className='font-pro-medium text-lg font-semibold text-primary'>Episodes</h2>
      <ScrollArea>
        <div className={`my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
          {episodes &&
            episodes?.map((episode, index) => {
              const queryParams = `title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episodeNumber=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}&seasonNumber=${encodeURIComponent(seasonNumber) || ''}`;

              const encryptedParams = encryptData(queryParams, process.env.NEXT_PUBLIC_CRYPTO_KEY);
              return (
                <Card key={episode.id} className='sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4 border'>
                  <CardHeader>
                    <Link
                      prefetch
                      href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/${info?.mappings?.tmdb}?data=${encodeURIComponent(encryptedParams)}`}
                      className='overflow-hidden'
                    >
                      {(episode?.image ?? episode?.img) && (
                        <div className='relative transition-all duration-300 hover:scale-110 active:scale-90'>
                          <Image
                            unoptimized
                            src={episode?.image ?? episode?.img?.hd}
                            onError={(e) => {
                              e.target.src =
                                'https://s4.anilist.co/file/anilistcdn/character/large/default.jpg';
                            }}
                            alt={episode.title}
                            width={526}
                            height={296}
                            className='mx-auto aspect-video bg-red-500 object-cover'
                          />
                          <div className='absolute inset-0 bg-black/50'></div>
                          <svg
                            stroke='currentColor'
                            fill='none'
                            strokeWidth='1.5'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                            color='white'
                            className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform'
                            height='20'
                            width='20'
                            xmlns='http://www.w3.org/2000/svg'
                            style={{ color: 'white' }}
                          >
                            <path
                              stroke-linecap='round'
                              strokeLinejoin='round'
                              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                            <path
                              stroke-linecap='round'
                              strokeLinejoin='round'
                              d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
                            ></path>
                          </svg>
                        </div>
                      )}
                    </Link>
                    <CardTitle className='line-clamp-1 px-2 font-pro-bold text-sm font-bold text-primary'>
                      {episode?.title ?? info?.title?.english ?? info?.title}
                    </CardTitle>
                  </CardHeader>
                  {episode?.description && (
                    <CardContent>
                      <CardDescription className='line-clamp-2'>
                        {episode?.description}
                      </CardDescription>
                    </CardContent>
                  )}
                  <CardFooter className='mx-2 grid grid-cols-2'>
                    {(episode?.number ?? episode?.episode) && (
                      <CardDescription className='text-white'>
                        EP: {episode?.number ?? episode?.episode}
                      </CardDescription>
                    )}
                    {episode?.season && (
                      <CardDescription className='text-white'>
                        SS: {episode?.season}
                      </CardDescription>
                    )}
                    {episode?.createdAt && (
                      <CardDescription className='text-white'>
                        {new Date(episode?.createdAt).toLocaleDateString()}
                      </CardDescription>
                    )}
                    {episode?.releaseDate && (
                      <CardDescription className='text-white'>
                        {new Date(episode?.releaseDate).toLocaleDateString()}
                      </CardDescription>
                    )}
                    <Link
                      prefetch
                      href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/${info?.mappings?.tmdb}?data=${encodeURIComponent(encryptedParams)}`}
                      className='text-white transition-all duration-300 hover:underline active:animate-ping'
                    >
                      Watch Now
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </ScrollArea>
    </section>
  );
};

export default EpisodeCard;
