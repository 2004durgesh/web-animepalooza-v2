// "use client"
import React, { Suspense } from 'react';
import fetchData from '@/components/Datafetcher';
import Image from 'next/image';
import parse from 'html-react-parser';
import { InfoSkeleton, CharactersSkeleton, EpisodesSkeleton } from '../loading';
import FavoriteButton from '@/components/FavoriteButton';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContentList from '@/components/ContentList';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import {
  CardStackIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  HeartIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import IconText from '@/components/IconText';
import TMDBInfo from '@/components/TMDBInfo';
import EpisodeCard from '@/components/EpisodeCard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const page = async ({ params }) => {
  let services =
    params.services === 'anime' || params.services === 'manga' || params.provider === 'tmdb'
      ? 'meta'
      : params.services;

  let provider =
    params.services === 'anime'
      ? 'anilist'
      : params.services === 'manga'
        ? 'anilist-manga'
        : params.provider;

  let animeInfo =
    params.services === 'anime'
      ? await fetchData(services, provider, `data/${params.info_id.join('/')}`, {
          provider: params.provider,
        })
      : null;

  let mangaInfo =
    params.services === 'manga'
      ? await fetchData(services, provider, `info/${params.info_id.join('/')}`, {
          provider: params.provider,
        })
      : null;

  let movieInfo =
    params.services === 'movies'
      ? provider !== 'tmdb'
        ? await fetchData(services, provider, `info`, {
            id: params.info_id.join('/'),
          })
        : await fetchData(services, provider, `info/${params.info_id[0]}`, {
            type: params.info_id[1],
          })
      : null;

  const info =
    params.services === 'anime' ? animeInfo : params.services === 'manga' ? mangaInfo : movieInfo;

  const episodes =
    params.services === 'anime'
      ? await fetchData(services, provider, `episodes/${params.info_id[0]}`, {
          provider: params.provider,
        })
      : params.provider === 'tmdb'
        ? info?.seasons
        : movieInfo?.episodes;

  const moviesEpisode =
    provider === 'tmdb' && params.info_id[1] === 'movie'
      ? [
          {
            id: info?.episodeId || 'N/A',
            title: info?.title || 'No Title',
            description: info?.description || 'No Description',
            releaseDate: info?.releaseDate || 'No Release Date',
            img: {
              mobile: info?.cover || 'default-mobile-cover.jpg',
              hd: info?.cover || 'default-hd-cover.jpg',
            },
          },
        ]
      : null;

  const chapters = mangaInfo?.chapters;

  // if(!info||!chapters) return notFound()
  const favoriteItem = {
    id: params.info_id.join('/'),
    title: info?.title?.english || info?.title?.romaji || info?.title,
    image: info?.image || info?.cover,
    type: info?.type,
    provider: params.provider,
    services: params.services,
    url: `/${params.services}/${params.provider}/info/${params.info_id.join('/')}`,
  };

  const airingDate = new Date(
    info?.nextAiringEpisode?.airingTime * 1000 ?? info?.nextAiringEpisode?.releaseDate
  );

  const ExtraInfoItem = ({ label, children, className }) => (
    <p className={`text-xs text-white sm:text-sm md:text-base lg:text-lg ${className}`}>
      <strong>{label}: </strong>
      <span>{children}</span>
    </p>
  );

  const ResponsiveText = ({ children }) => (
    <span className='px-1 text-xs sm:text-sm md:text-base lg:text-lg'>{children}</span>
  );

  return (
    <main className='-mt-16'>
      <Suspense fallback={<InfoSkeleton />}>
        <div className='relative w-screen'>
          <div className='absolute w-screen'>
            <div className='absolute inset-0 z-10 h-[440px] w-screen bg-gradient-to-t from-black from-10% to-transparent'></div>
            <Image
              unoptimized
              src={info?.cover ?? info?.image}
              alt={info?.title?.english ?? info?.title}
              height={1000}
              width={1000}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.5) 100%)`,
              }}
              className='absolute left-0 top-0 z-0 h-[340px] w-screen object-cover brightness-[55%]'
            />
          </div>
          <div className='flex w-full flex-col items-center justify-center gap-6 pt-4 md:pt-24'>
            <div className='flex w-full flex-col items-center gap-5 px-3 py-10 pt-12 md:flex-row md:items-end xl:px-14'>
              <div className='relative z-20 h-[250px] w-[180px] shrink-0 overflow-hidden rounded'>
                <Image
                  unoptimized
                  src={info?.image}
                  alt={info?.title?.english ?? info?.title}
                  height={300}
                  width={300}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='z-10 flex flex-col items-center gap-2 md:items-start'>
                <p>
                  {info?.season} {info?.releaseDate}
                </p>
                <div className='flex items-center gap-4'>
                  <h1 className='pro-bold inline text-2xl font-bold md:text-4xl'>
                    {info?.title?.english || info?.title?.romaji || info?.title}
                  </h1>
                  <Popover>
                    <PopoverTrigger asChild>
                      <InfoCircledIcon className='h-6 w-6' />
                    </PopoverTrigger>
                    <PopoverContent className='w-80 rounded-lg border-secondary-foreground bg-muted p-4 text-white shadow-lg'>
                      <div>
                        <h3 className='mb-3 text-lg font-semibold'>Anime Details</h3>
                        <div className='space-y-4'>
                          <div>
                            <h4 className='mb-2 text-sm font-medium text-muted-foreground'>
                              Genres
                            </h4>
                            <div className='flex flex-wrap gap-2'>
                              {info?.genres &&
                                info?.genres.map((genre, index) => (
                                  <Badge key={index} variant='outline' className='bg-background'>
                                    {genre}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                          <div className='flex flex-col gap-4 sm:hidden'>
                            <div className='grid grid-cols-2 gap-3'>
                              {info?.totalEpisodes && (
                                <IconText Icon={<CardStackIcon />}>{info?.totalEpisodes}</IconText>
                              )}
                              {info?.type && (
                                <Badge className='text-md font-bold'>{info?.type}</Badge>
                              )}
                              {info?.status && (
                                <IconText
                                  Icon={
                                    info?.status === 'Completed' ? <CheckIcon /> : <ClockIcon />
                                  }
                                >
                                  {info?.status}
                                </IconText>
                              )}
                              {info?.rating && (
                                <IconText
                                  Icon={<StarIcon />}
                                >{`${params.services === 'movies' ? Number(info?.rating).toFixed(1) : (Number(info?.rating) / 10).toFixed(1)}`}</IconText>
                              )}
                            </div>
                            {info?.status !== 'Completed' && info?.nextAiringEpisode && (
                              <IconText Icon={<CalendarIcon />}>
                                Ep {info?.nextAiringEpisode?.episode}, {airingDate.toDateString()}
                              </IconText>
                            )}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='hidden flex-wrap gap-4 sm:flex'>
                  {info?.totalEpisodes && (
                    <IconText Icon={<CardStackIcon />}>{info?.totalEpisodes}</IconText>
                  )}
                  {info?.type && <Badge className='text-md font-bold'>{info?.type}</Badge>}
                  {info?.status && (
                    <IconText Icon={info?.status === 'Completed' ? <CheckIcon /> : <ClockIcon />}>
                      {info?.status}
                    </IconText>
                  )}
                  {info?.rating && (
                    <IconText
                      Icon={<StarIcon />}
                    >{`${params.services === 'movies' ? Number(info?.rating).toFixed(1) : (Number(info?.rating) / 10).toFixed(1)}`}</IconText>
                  )}
                  {info?.status !== 'Completed' && info?.nextAiringEpisode && (
                    <IconText Icon={<CalendarIcon />}>
                      Ep {info?.nextAiringEpisode?.episode}, {airingDate.toDateString()}
                    </IconText>
                  )}
                  <FavoriteButton item={favoriteItem} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <div className='mx-4'>
        <Accordion type='single' collapsible>
          <AccordionItem value='description'>
            <AccordionTrigger>
              <h1 className='pro-bold text-lg font-bold sm:text-xl'>Description: </h1>
            </AccordionTrigger>
            <AccordionContent>
              <p className='pro-regular text-xs sm:text-sm md:text-base lg:text-lg'>
                {parse(String(info?.description))}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Suspense fallback='loading list.....'>
          <div className='mt-10 grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-5'>
            {info?.trailer && (
              <div className='flex items-center justify-center py-4 md:col-span-2 lg:col-span-2 xl:col-span-2'>
                <iframe
                  className='aspect-video w-full'
                  src={`https://www.youtube.com/embed/${info?.trailer.id}`}
                  title={`Trailer of ${info?.title.english}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {info?.recommendations && info?.recommendations.length > 0 && (
              <div
                className={`space-y-4 ${info?.trailer ? 'lg:col-span-2 xl:col-span-3' : 'lg:col-span-4 xl:col-span-5'}`}
              >
                <ContentList
                  params={params}
                  headerText='Recommendations'
                  data={info?.recommendations}
                  service={services}
                  provider={provider}
                />
              </div>
            )}
          </div>
        </Suspense>
        <Suspense fallback={<CharactersSkeleton />}>
          {info?.characters && (
            <>
              <h2 className='font-pro-medium text-lg font-semibold text-primary'>Characters: </h2>
              <ScrollArea className='flex flex-nowrap overflow-x-auto whitespace-nowrap py-4'>
                {info?.characters.map((character, index) => (
                  <Card
                    key={index}
                    className='mx-2 inline-block w-fit flex-shrink-0 overflow-hidden border-none py-2 text-white'
                  >
                    <Image
                      unoptimized
                      src={character.image}
                      alt={services === 'movies' ? character?.name : character?.name?.userPreferred}
                      className='mx-auto h-40 w-40 rounded-full object-cover'
                      width={197}
                      height={296}
                    />
                    <CardHeader className='mt-4 space-y-0 p-0'>
                      <CardTitle className='line-clamp-1 px-2 text-center font-pro-bold text-lg font-bold text-primary'>
                        {services === 'movies' ? character?.name : character?.name?.userPreferred}
                      </CardTitle>
                    </CardHeader>
                    {character?.role && (
                      <CardContent>
                        <div className='mx-4 flex items-center space-x-4'>
                          <Badge variant='destructive' className='px-2 py-1'>
                            {character.role}
                          </Badge>
                          <Link
                            href={`/${params.services}/character/${character.id}?info_id=${params.info_id}`}
                            className='transition-all duration-300 hover:underline active:animate-ping'
                          >
                            Read More
                          </Link>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </>
          )}
        </Suspense>
        <Suspense fallback={<EpisodesSkeleton />}>
          {episodes && episodes.length > 0 ? (
            provider !== 'tmdb' ? (
              <EpisodeCard episodes={episodes} params={params} info={info} />
            ) : (
              <TMDBInfo episodes={episodes} params={params} info={info} />
            )
          ) : (
            provider === 'tmdb' &&
            params?.info_id[1] === 'movie' && (
              <TMDBInfo episodes={moviesEpisode} params={params} info={info} />
            )
          )}
        </Suspense>
        {chapters && chapters.length > 0 && (
          <>
            <h2 className='font-pro-medium text-lg font-semibold text-primary'>Chapters</h2>
            <ScrollArea>
              <div
                className={`my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${chapters.length > 5 ? 'h-[75vh]' : null}`}
              >
                {chapters.map((chapter, index) => (
                  <Card key={chapter.id} className='sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4 border'>
                    <CardHeader>
                      <Link
                        href={`/${params?.services}/${params?.provider}/read/${chapter?.id}?title=${encodeURIComponent(chapter?.title ?? info?.title?.english ?? info?.title)}&chapter-number=${encodeURIComponent(chapter?.chapterNumber || '')}&volume-number=${encodeURIComponent(chapter?.volumeNumber || '')}`}
                        className='overflow-hidden'
                      >
                        <div className='relative transition-all duration-300 hover:scale-110 active:scale-90'>
                          {chapter?.image && (
                            <Image
                              src={chapter?.image}
                              alt={chapter.title}
                              width={526}
                              height={296}
                              className='mx-auto aspect-video bg-red-500 object-cover'
                            />
                          )}
                          <div className='absolute inset-0 bg-black/50'></div>
                          {/* <HiOutlinePlayCircle color='white' size={20} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' /> */}
                        </div>
                      </Link>
                      <CardTitle className='line-clamp-1 px-2 font-pro-bold text-sm font-bold text-primary'>
                        {chapter?.title ?? info?.title?.english ?? info?.title}
                      </CardTitle>
                    </CardHeader>
                    {chapter?.description && (
                      <CardContent>
                        <CardDescription className='line-clamp-3'>
                          {chapter?.description}
                        </CardDescription>
                      </CardContent>
                    )}
                    <CardFooter className='mx-2 grid grid-cols-2'>
                      {chapter?.chapterNumber && (
                        <CardDescription className='text-white'>
                          Chapter: {chapter.chapterNumber}
                        </CardDescription>
                      )}
                      {chapter?.volumeNumber && (
                        <CardDescription className='text-white'>
                          Volume: {chapter.volumeNumber}
                        </CardDescription>
                      )}
                      <Link
                        href={`/${params?.services}/${params?.provider}/read/${chapter?.id}?title=${encodeURIComponent(chapter?.title ?? info?.title?.english ?? info?.title)}&chapter-number=${encodeURIComponent(chapter?.chapterNumber || '')}&volume-number=${encodeURIComponent(chapter?.volumeNumber || '')}`}
                        className='text-white transition-all duration-300 hover:underline active:animate-ping'
                      >
                        Read Now
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </main>
  );
};

export default page;
