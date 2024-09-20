// "use client"
import React, { Suspense } from 'react'
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import parse from 'html-react-parser';
import Loading from '../loading';
import FavoriteButton from '@/components/FavoriteButton';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContentList from '@/components/ContentList';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';
import { CardStackIcon, StarIcon, CalendarIcon, ClockIcon, CheckIcon } from '@radix-ui/react-icons'
import IconText from '@/components/IconText';
import TMDBInfo from '@/components/TMDBInfo';
import EpisodeCard from '@/components/EpisodeCard';

const page = async ({ params }) => {
    let services =
        (params.services === 'anime' || params.services === 'manga' || params.provider === "tmdb")
            ? 'meta'
            : params.services;

    let provider =
        (params.services === 'anime')
            ? "anilist"
            : (params.services === 'manga')
                ? "anilist-manga"
                : params.provider;

    let animeInfo =
        (params.services === "anime")
            ? await fetchData(services, provider, `data/${params.info_id.join("/")}`, { provider: params.provider })
            : null;

    let mangaInfo =
        (params.services === "manga")
            ? await fetchData(services, provider, `info/${params.info_id.join("/")}`, { provider: params.provider })
            : null;

    let movieInfo =
        (params.services === "movies")
            ? (provider !== "tmdb")
                ? await fetchData(services, provider, `info`, { id: params.info_id.join("/") })
                : await fetchData(services, provider, `info/${params.info_id[0]}`, { type: params.info_id[1] })
            : null;

    const info =
        (params.services === 'anime')
            ? animeInfo
            : (params.services === 'manga')
                ? mangaInfo
                : movieInfo;

    const episodes =
        (params.services === 'anime')
            ? await fetchData(services, provider, `episodes/${params.info_id[0]}`, { provider: params.provider })
            : (params.provider === "tmdb")
                ? info?.seasons
                : movieInfo?.episodes;

    const moviesEpisode = (provider === 'tmdb' && params.info_id[1] === 'movie') ? [
        {
            "id": info?.episodeId || 'N/A',
            "title": info?.title || 'No Title',
            "description": info?.description || 'No Description',
            "releaseDate": info?.releaseDate || 'No Release Date',
            "img": {
                "mobile": info?.cover || 'default-mobile-cover.jpg',
                "hd": info?.cover || 'default-hd-cover.jpg'
            }
        }
    ] : null;

    const chapters = mangaInfo?.chapters;

    // if(!info||!chapters) return notFound()
    const favoriteItem = {
        id: params.info_id.join("/"),
        title: info?.title?.english || info?.title?.romaji || info?.title,
        image: info?.image || info?.cover,
        type: info?.type,
        provider: params.provider,
        services: params.services,
        url: `/${params.services}/${params.provider}/info/${params.info_id.join("/")}`
    }
    const airingDate = new Date(info?.nextAiringEpisode?.airingTime * 1000 ?? info?.nextAiringEpisode?.releaseDate);
    const ExtraInfoItem = ({ label, children, className }) => (
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-white ${className}`}>
            <strong>{label}: </strong>
            <span>{children}</span>
        </p>
    );
    const ResponsiveText = ({ children }) => (
        <span className='text-xs sm:text-sm md:text-base lg:text-lg px-1'>{children}</span>
    );


    return (
        <Suspense fallback={<Loading />}>
            {/* <div>{JSON.stringify(params?.info_id)}</div> */}
            {/* <div>{JSON.stringify(info && info?.seasons[0]?.episodes)}</div> */}
            <main className=' -mt-16'>
                <div className='relative w-screen'>
                    <div className="w-screen absolute">
                        <div class="bg-gradient-to-t from-black from-10% to-transparent absolute h-[440px] w-screen z-10 inset-0"></div>
                        <Image
                            unoptimized
                            src={info?.cover??info?.image}
                            alt={info?.title?.english ?? info?.title}
                            height={1000} width={1000}
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.5) 100%)`
                            }}
                            className="object-cover w-screen absolute top-0 left-0 h-[340px] brightness-[55%] z-0"
                        />
                    </div>
                    <div className="gap-6 w-full pt-4 md:pt-24 flex flex-col items-center justify-center">
                        <div className="flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12 px-3 xl:px-14 py-10">
                            <div className='shrink-0 w-[180px] h-[250px] rounded overflow-hidden relative z-20'>
                                <Image unoptimized src={info?.image} alt={info?.title?.english ?? info?.title} height={300} width={300} className='h-full w-full object-cover' />
                            </div>
                            <div className='z-10 flex flex-col gap-2 md:items-start items-center'>
                                <p>{info?.season} {info?.releaseDate}</p>
                                <h1 className='font-bold text-2xl md:text-4xl pro-bold inline '>{info?.title?.english || info?.title?.romaji || info?.title}</h1>
                                <div className='flex gap-4'>
                                    {info?.totalEpisodes && <IconText Icon={<CardStackIcon />}>{info?.totalEpisodes}</IconText>}
                                    {info?.type && <Badge variant="destructive" className='font-bold text-md'>{info?.type}</Badge>}
                                    {info?.status && <IconText Icon={info?.status === "Completed" ? <CheckIcon /> : <ClockIcon />}>
                                        {info?.status}
                                    </IconText>}
                                    {info?.rating && <IconText Icon={<StarIcon />}>{`${params.services === 'movies' ? (Number(info?.rating)).toFixed(1) : (Number(info?.rating) / 10).toFixed(1)}`}</IconText>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mx-4'>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="description">
                                <AccordionTrigger>
                                    <h1 className='font-bold text-lg sm:text-xl pro-bold'>Description: </h1>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className='pro-regular text-xs sm:text-sm md:text-base lg:text-lg'>{parse(String(info?.description))}</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10'>
                        {info?.trailer &&
                            <div className='py-4 md:col-span-2 lg:col-span-2 xl:col-span-2 flex items-center justify-center'>
                                <iframe
                                    className='w-full aspect-video'
                                    src={`https://www.youtube.com/embed/${info?.trailer.id}`}
                                    title={`Trailer of ${info?.title.english}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                >
                                </iframe>
                            </div>
                        }
                        {info?.recommendations && info?.recommendations.length > 0 && <div className={`space-y-4 ${info?.trailer ? 'lg:col-span-2 xl:col-span-3' : 'lg:col-span-4 xl:col-span-5'}`}>
                            <ContentList params={params} headerText='Recommendations' data={info?.recommendations} service={services} provider={provider} />
                        </div>}
                    </div>
                    {info?.characters && <>
                        <h2 className='text-lg font-semibold font-pro-medium text-primary'>Characters: </h2>
                        <ScrollArea className='flex flex-nowrap overflow-x-auto whitespace-nowrap py-4'>
                            {info?.characters.map((character, index) => (
                                <Card key={index} className='overflow-hidden mx-2 py-2 w-fit text-white border-none inline-block flex-shrink-0'>
                                    <Image unoptimized src={character.image} alt={services === "movies" ? character?.name : character?.name?.userPreferred} className="h-40 w-40 mx-auto rounded-full object-cover" width={197} height={296} />
                                    <CardHeader className='space-y-0 p-0 mt-4'>
                                        <CardTitle className='px-2 text-lg font-bold font-pro-bold text-primary line-clamp-1 text-center'>
                                            {services === "movies" ? character?.name : character?.name?.userPreferred}
                                        </CardTitle>
                                    </CardHeader>
                                    {character?.role && <CardContent>
                                        <div className="flex items-center space-x-4 mx-4">
                                            <Badge variant="secondary" className='py-1 px-2'>{character.role}</Badge>
                                            <Link
                                                href={`/${params.services}/character/${character.id}?info_id=${params.info_id}`} className="hover:underline transition-all duration-300 active:animate-ping">
                                                Read More
                                            </Link>
                                        </div>
                                    </CardContent>}
                                </Card>
                            ))}
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </>}
                    {
                        episodes && episodes.length > 0 ? (
                            provider !== "tmdb" ? (
                                <EpisodeCard episodes={episodes} params={params} info={info} />
                            ) : (
                                <TMDBInfo episodes={episodes} params={params} info={info} />
                            )
                        ) : (
                            provider === "tmdb" && params?.info_id[1] === 'movie' && (
                                <TMDBInfo episodes={moviesEpisode} params={params} info={info} />
                            )
                        )
                    }
                    {chapters && chapters.length > 0 &&
                        <>
                            <h2 className='text-lg font-semibold font-pro-medium text-primary'>Chapters</h2>
                            <ScrollArea>
                                <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 ${chapters.length > 5 ? "h-[75vh]" : null}`}>
                                    {chapters.map((chapter, index) => (
                                        <Card key={chapter.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                                            <CardHeader>
                                                <Link
                                                    href={`/${params?.services}/${params?.provider}/read/${chapter?.id}?title=${encodeURIComponent(chapter?.title ?? info?.title?.english ?? info?.title)}&chapter-number=${encodeURIComponent(chapter?.chapterNumber || '')}&volume-number=${encodeURIComponent(chapter?.volumeNumber || '')}`}
                                                    className="overflow-hidden">
                                                    <div className='relative hover:scale-110 active:scale-90 transition-all duration-300'>
                                                        {chapter?.image && <Image src={chapter?.image} alt={chapter.title} width={526} height={296} className='mx-auto aspect-video object-cover bg-red-500' />}
                                                        <div className='absolute inset-0 bg-black/50'></div>
                                                        {/* <HiOutlinePlayCircle color='white' size={20} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' /> */}
                                                    </div>
                                                </Link>
                                                <CardTitle className='px-2 text-sm font-bold font-pro-bold text-primary line-clamp-1'>{chapter?.title ?? info?.title?.english ?? info?.title}</CardTitle>
                                            </CardHeader>
                                            {chapter?.description && <CardContent>
                                                <CardDescription className="line-clamp-3">
                                                    {chapter?.description}
                                                </CardDescription>
                                            </CardContent>}
                                            <CardFooter className='grid grid-cols-2 mx-2 '>
                                                {chapter?.chapterNumber && <CardDescription className='text-white'>Chapter: {chapter.chapterNumber}</CardDescription>}
                                                {chapter?.volumeNumber && <CardDescription className='text-white'>Volume: {chapter.volumeNumber}</CardDescription>}
                                                <Link
                                                    href={`/${params?.services}/${params?.provider}/read/${chapter?.id}?title=${encodeURIComponent(chapter?.title ?? info?.title?.english ?? info?.title)}&chapter-number=${encodeURIComponent(chapter?.chapterNumber || '')}&volume-number=${encodeURIComponent(chapter?.volumeNumber || '')}`}
                                                    className="text-white hover:underline transition-all duration-300 active:animate-ping"
                                                >Read Now
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </>
                    }
                </div>

            </main>
        </Suspense>
    )
}

export default page