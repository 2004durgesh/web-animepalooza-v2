// "use client"
import React from 'react'
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import parse from 'html-react-parser';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContentList from '@/components/ContentList';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';
import IconText from '@/components/IconText';
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays, HiOutlineClock, IoCheckmarkDoneOutline } from '@/constants/Icon'

const page = async ({ params }) => {
    const info = await fetchData('meta', 'anilist', `data/${params.info_id[0]}`, { provider: params.provider })
    const episodes = await fetchData('meta', 'anilist', `episodes/${params.info_id[0]}`, { provider: params.provider })
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
        <>
            <div style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%), url(${info.cover})`
            }}
                className='h-96 bg-cover bg-center bg-no-repeat bg-none m-4'
            >
                <div className='backdrop-blur-md h-96 w-full flex flex-col md:flex-row items-center justify-center px-4'>
                    <div className='self-center md:self-end my-4 w-full md:w-1/3 order-2 md:order-1 text-center'>
                        <h1 className='font-bold text-2xl pro-bold inline '>{info.title.english}</h1>
                        <div className='flex justify-center divide-x-2 gap-x-2'>
                            <ResponsiveText>{info.type}</ResponsiveText>
                            <IconText Icon={<HiOutlineCalendarDays />}>{info.releaseDate}</IconText>
                            <IconText Icon={<HiOutlineRectangleStack />}>{info.totalEpisodes}</IconText>
                        </div>
                    </div>
                    <Image src={info.image} alt={info.title.english} height={284} width={203} className='mx-auto h-full w-auto order-2' />
                    <div className='self-center md:self-end my-4 w-full md:w-1/3 order-3'>
                        <div className='flex flex-wrap divide-x-2 gap-x-2'>
                            <IconText Icon={info.status === "Completed" ? <IoCheckmarkDoneOutline /> : <HiOutlineClock />}>
                                {info.status}
                            </IconText>
                            <IconText Icon={<HiOutlineStar />}>{(Number(info.rating) / 10).toFixed(1)}</IconText>
                            {info.status !== "Completed" && <ResponsiveText>Ep {info.nextAiringEpisode.episode}, {airingDate.toDateString()}</ResponsiveText>}
                        </div>
                        <ScrollArea className="whitespace-nowrap">
                            {info.genres.map((genre, index) => (
                                <Badge variant="outline" key={index} className='m-1 text-white inline-block'>{genre}</Badge>
                            ))}
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-20 md:mt-4'>
                <ExtraInfoItem label="Studios">
                    {info.studios.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white'>{item}</Badge>
                    ))}
                </ExtraInfoItem>
                <ExtraInfoItem label="Start Date">
                    {info?.startDate?.month}/{info?.startDate?.day}/{info?.startDate?.year}
                </ExtraInfoItem>
                <ExtraInfoItem label="End Date">
                    {info?.endDate?.month}/{info?.endDate?.day}/{info?.endDate?.year}
                </ExtraInfoItem>
                <ExtraInfoItem label="Season">
                    {info.season}
                </ExtraInfoItem>
            </div>
            <ScrollArea className="whitespace-nowrap">
                <ExtraInfoItem label="Other Names">
                    {info.synonyms.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white'>{item}</Badge>
                    ))}
                </ExtraInfoItem>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Accordion type="single" collapsible>
                <AccordionItem value="description">
                    <AccordionTrigger>
                        <h1 className='font-bold text-lg sm:text-xl pro-bold'>Description: </h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <span className='pro-regular text-xs sm:text-sm md:text-base lg:text-lg'>{parse(info.description)}</span>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className='grid md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {info?.trailer &&
                    <div className='py-4 md:col-span-2 lg:col-span-2 xl:col-span-2 flex items-center justify-center'>
                        <iframe
                            className='w-full aspect-video'
                            src={`https://www.youtube.com/embed/${info.trailer.id}`}
                            title={`Trailer of ${info.title.english}`}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        >
                        </iframe>
                    </div>
                }
                <div className={`space-y-4 ${info?.trailer ? 'lg:col-span-2 xl:col-span-3' : 'lg:col-span-4 xl:col-span-5'}`}>
                    <ContentList params={params} headerText='Recommendations' data={info?.recommendations} />
                </div>
            </div>
            <h2 className='text-lg font-semibold font-pro-medium text-pro-red'>Characters: </h2>
            <ScrollArea className='flex flex-nowrap overflow-x-auto whitespace-nowrap py-4'>
                {info?.characters && info.characters.map((character, index) => (
                    <Card key={index} className='overflow-hidden mx-2 py-2 w-fit text-white border-none inline-block flex-shrink-0'>
                        <Image src={character.image} alt={character.name.userPreferred} className="h-40 w-40 mx-auto rounded-full object-cover" width={197} height={296} />
                        <CardHeader className='space-y-0 p-0 mt-4'>
                            <CardTitle className='px-2 text-lg font-bold font-pro-bold text-pro-red line-clamp-1 text-center'>
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {episodes.map((episode, index) => (
                    <Card key={episode.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                        <CardHeader>
                            <Image src={episode.image} alt={episode.title} width={526} height={296} className='mx-auto aspect-video object-cover'/>
                            <CardTitle className='px-2 text-lg font-bold font-pro-bold text-pro-red line-clamp-1'>{episode.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Ep: {episode.number}</CardDescription>
                            <CardDescription>Created At: {new Date(episode.createdAt).toLocaleDateString()}</CardDescription>
                            <Link href={'#'} className="hover:underline transition-all duration-300 active:animate-ping text-white">Watch</Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default page