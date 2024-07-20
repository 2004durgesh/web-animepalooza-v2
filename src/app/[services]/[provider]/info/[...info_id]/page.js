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
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays, HiOutlineClock, HiOutlinePlayCircle } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import IconText from '@/components/IconText';

const page = async ({ params }) => {
    let services = params.services === 'anime' || params.services === 'manga' || params.provider === "tmdb" ? 'meta' : params.services;
    let provider = params.services === 'anime' ? "anilist" : params.services === 'manga' ? "anilist-manga" : params.provider;
    let animeInfo = params.services === "anime" && await fetchData(services, provider, `data/${params.info_id.join("/")}`, { provider: params.provider })
    let mangaInfo = params.services==="manga" && await fetchData(services, provider, `info/${params.info_id.join("/")}`, { provider: params.provider })
    let movieInfo = params.services === "movies" &&( provider !== "tmdb" ? await fetchData(services, provider, `info`, { id: params.info_id.join("/") }) : await fetchData(services, provider, `info/${params.info_id[0]}`, { type: params.info_id[1] }))
    const info = params.services === 'anime' ? animeInfo : params.services === 'manga' ? mangaInfo : movieInfo
    const episodes = params.services === 'anime' ? await fetchData(services, provider, `episodes/${params.info_id[0]}`, { provider: params.provider }) : params.provider === "tmdb" ? info?.seasons && info?.seasons[0]?.episodes : movieInfo?.episodes;
    const chapters = mangaInfo?.chapters;
    // if(!info||!chapters) return notFound()
        const favoriteItem={
            id:params.info_id.join("/"),
            title:info?.title?.english || info?.title?.romaji || info?.title,
            image:info?.image || info?.cover,
            type:info?.type,
            provider:params.provider,
            services:params.services,
            url:`/${params.services}/${params.provider}/info/${params.info_id.join("/")}`
        }
    const airingDate = new Date(info?.nextAiringEpisode?.airingTime * 1000);
    const ExtraInfoItem = ({ label, children }) => (
        <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white'>
            <strong>{label}: </strong>
            <span>{children}</span>
        </p>
    );
    const ResponsiveText = ({ children }) => (
        <span className='text-xs sm:text-sm md:text-base lg:text-lg px-1'>{children}</span>
    );


    return (
        <Suspense fallback={<Loading />}>
            {/* <div>{JSON.stringify(params.info_id[0])}</div> */}
            {/* <div>{JSON.stringify(info && info?.seasons[0]?.episodes)}</div> */}
            <div style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%), url(${info?.cover})`
            }}
                className='h-96 bg-cover bg-center bg-no-repeat bg-none m-4'
            >
                <div className='backdrop-blur-sm h-96 w-full flex flex-col md:flex-row items-center justify-center px-4'>
                    <div className='self-center md:self-end mt-3 w-full md:w-1/3 order-2 md:order-1 text-center'>
                        <h1 className='font-bold text-lg md:text-2xl pro-bold inline '>{info?.title?.english || info?.title?.romaji || info?.title}</h1>
                        <div className='flex items-center justify-center divide-x-2 gap-x-2'>
                            <ResponsiveText>{info?.type}</ResponsiveText>
                            {info?.releaseDate && <IconText Icon={<HiOutlineCalendarDays />}>{info?.releaseDate}</IconText>}
                            {info?.totalEpisodes && <IconText Icon={<HiOutlineRectangleStack />}>{info?.totalEpisodes}</IconText>}
                        <FavoriteButton item={favoriteItem}/>
                        </div>
                    </div>
                    <Image unoptimized src={info?.image} alt={info?.title?.english ?? info?.title} height={284} width={203} className='mx-auto h-full w-auto order-2' />
                    <div className='self-center md:self-end my-4 w-full md:w-1/3 order-3'>
                        <div className='flex flex-wrap divide-x-2 gap-x-2'>
                            {info?.status && <IconText Icon={info?.status === "Completed" ? <IoCheckmarkDoneOutline /> : <HiOutlineClock />}>
                                {info?.status}
                            </IconText>}
                            {info?.rating && <IconText Icon={<HiOutlineStar />}>{`${params.services === 'movies' ? info?.rating : (Number(info?.rating) / 10).toFixed(1)}`}</IconText>}
                            {info?.status !== "Completed" && info?.nextAiringEpisode && <ResponsiveText>Ep {info?.nextAiringEpisode?.episode}, {airingDate.toDateString()}</ResponsiveText>}
                        </div>
                        <ScrollArea className="whitespace-nowrap">
                            {info?.genres?.map((genre, index) => (
                                <Badge variant="outline" key={index} className='m-1 text-white inline-block'>{genre}</Badge>
                            ))}
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div className={`grid ${params.services === 'movies' ? 'grid-cols-1' : 'grid-cols-2'}  md:grid-cols-4 mt-20 md:mt-4`}>
                {info?.studios && <ExtraInfoItem label="Studios">
                    {info?.studios?.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white'>{item}</Badge>
                    ))}
                </ExtraInfoItem>}
                {info?.production && <ExtraInfoItem label="Production">
                    {info?.production && info?.production}
                </ExtraInfoItem>}
                {info?.startDate && <ExtraInfoItem label="Start Date">
                    {info?.startDate?.day}/{info?.startDate?.month}/{info?.startDate?.year}
                </ExtraInfoItem>}
                {info?.endDate && <ExtraInfoItem label="End Date">
                    {info?.endDate?.day}/{info?.endDate?.month}/{info?.endDate?.year}
                </ExtraInfoItem>}
                {info?.season && <ExtraInfoItem label="Season">
                    {info?.season}
                </ExtraInfoItem>}
            </div>
            <ScrollArea className="whitespace-nowrap">
                {(info?.synonyms || info?.otherNames) && <ExtraInfoItem label="Other Names">
                    {(info?.synonyms?.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white inline-block border'>{item}</Badge>
                    ))) || (info?.otherNames?.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white inline-block border'>{item}</Badge>
                    )))}
                </ExtraInfoItem>}
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Accordion type="single" collapsible>
                <AccordionItem value="description">
                    <AccordionTrigger>
                        <h1 className='font-bold text-lg sm:text-xl pro-bold'>Description: </h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <span className='pro-regular text-xs sm:text-sm md:text-base lg:text-lg'>{parse(String(info?.description))}</span>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {info?.trailer &&
                    <div className='py-4 md:col-span-2 lg:col-span-2 xl:col-span-2 flex items-center justify-center'>
                        <iframe
                            className='w-full aspect-video'
                            src={`https://www.youtube.com/embed/${info?.trailer.id}`}
                            title={`Trailer of ${info?.title.english}`}
                            frameborder="0"
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
                            <Image unoptimized src={character.image} alt={character.name.userPreferred} className="h-40 w-40 mx-auto rounded-full object-cover" width={197} height={296} />
                            <CardHeader className='space-y-0 p-0 mt-4'>
                                <CardTitle className='px-2 text-lg font-bold font-pro-bold text-primary line-clamp-1 text-center'>
                                    {character.name.userPreferred}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4 mx-4">
                                    <Badge variant="secondary" className='py-1 px-2'>{character.role}</Badge>
                                    <Link
                                        href={`/${params.services}/character/${character.id}?info_id=${params.info_id}`} className="hover:underline transition-all duration-300 active:animate-ping">
                                        Read More
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </>}
            {episodes && episodes.length > 0 &&
                <>
                    <h2 className='text-lg font-semibold font-pro-medium text-primary'>Episodes</h2>
                    <ScrollArea>
                        <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 ${episodes.length > 5 ? "h-[75vh]" : null}`}>
                            {episodes.map((episode, index) => (
                                <Card key={episode.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                                    <CardHeader>
                                        <Link
                                            href={`/${params?.services}/${params?.provider}/watch/${params.provider === "tmdb" ? params.info_id[0] : episode?.id}/${info?.id}/${params.provider === "tmdb" ? episode?.season : null}/${params.provider === "tmdb" ? episode?.episode : null}?title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episode-number=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}`}
                                            className="overflow-hidden">
                                            <div className='relative hover:scale-110 active:scale-90 transition-all duration-300'>
                                                {(episode?.image ?? episode?.img) && <Image src={episode?.image ?? episode?.img?.hd} alt={episode.title} width={526} height={296} className='mx-auto aspect-video object-cover bg-red-500' />}
                                                <div className='absolute inset-0 bg-black/50'></div>
                                                <HiOutlinePlayCircle color='white' size={20} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' />
                                            </div>
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
                                            href={`/${params?.services}/${params?.provider}/watch/${params.provider === "tmdb" ? params.info_id[0] : episode?.id}/${info?.id}/${params.provider === "tmdb" ? episode?.season : null}/${params.provider === "tmdb" ? episode?.episode : null}?title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episode-number=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}`}
                                            className="text-white hover:underline transition-all duration-300 active:animate-ping"
                                        >Watch Now
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </>
            }
            {chapters && chapters.length > 0 &&
                <>
                    <h2 className='text-lg font-semibold font-pro-medium text-primary'>Chapters</h2>
                    <ScrollArea>
                        <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 ${chapters.length > 5 ? "h-[75vh]" : null}`}>
                            {chapters.map((chapter, index) => (
                                <Card key={chapter.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                                    <CardHeader>
                                        {/* <Link
                                            href={`/${params?.services}/${params?.provider}/read/${chapter?.id}?title=${encodeURIComponent(chapter?.title ?? info?.title?.english ?? info?.title)}&chapter-number=${encodeURIComponent(chapter?.chapterNumber || '')}&volume-number=${encodeURIComponent(chapter?.volumeNumber || '')}`}
                                            className="overflow-hidden">
                                            <div className='relative hover:scale-110 active:scale-90 transition-all duration-300'>
                                                {chapter?.image && <Image src={chapter?.image} alt={chapter.title} width={526} height={296} className='mx-auto aspect-video object-cover bg-red-500' />}
                                                <div className='absolute inset-0 bg-black/50'></div>
                                                <HiOutlinePlayCircle color='white' size={20} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' />
                                            </div>
                                        </Link> */}
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
        </Suspense>
    )
}

export default page