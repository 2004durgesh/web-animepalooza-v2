// "use client"
import React from 'react'
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import parse from 'html-react-parser';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import ContentList from '@/components/ContentList';
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
// import { Card, CardContent } from '@/components/ui/card';


const page = async ({ params }) => {
    const info = await fetchData('meta', 'anilist', `data/${params.info_id[0]}`, { provider: params.provider })
    // console.log(info);
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

    const IconText = ({ Icon, children }) => (
        <span className='flex items-center text-xs sm:text-sm md:text-base lg:text-lg px-1'>
            <Icon size={20} />{children}
        </span>
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
                            <IconText Icon={HiOutlineCalendarDays}>{info.releaseDate}</IconText>
                            <IconText Icon={HiOutlineRectangleStack}>{info.totalEpisodes}</IconText>
                        </div>
                    </div>
                    <Image src={info.image} alt={info.title.english} height={284} width={203} className='mx-auto h-full w-auto order-2' />
                    <div className='self-center md:self-end my-4 w-full md:w-1/3 order-3'>
                        <div className='flex flex-wrap divide-x-2 gap-x-2'>
                            <IconText Icon={info.status === "Completed" ? IoCheckmarkDoneOutline : HiOutlineClock}>
                                {info.status}
                            </IconText>
                            <IconText Icon={HiOutlineStar}>{(Number(info.rating) / 10).toFixed(1)}</IconText>
                            {info.status !== "Completed" && <ResponsiveText>Ep {info.nextAiringEpisode.episode}, {airingDate.toDateString()}</ResponsiveText>}
                        </div>
                        <div className='overflow-x-auto whitespace-nowrap'>
                            {info.genres.map((genre, index) => (
                                <Badge variant="outline" key={index} className='m-1 text-white inline-block'>{genre}</Badge>
                            ))}
                        </div>
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
            <div className='overflow-x-auto whitespace-nowrap infinity-scroll'>
                <ExtraInfoItem label="Other Names">
                    {info.synonyms.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white'>{item}</Badge>
                    ))}
                </ExtraInfoItem>
            </div>
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
            <div className='grid grid-cols-5 gap-4'>
                {info?.trailer &&
                    <iframe
                        className='py-4 col-span-2'
                        width="450"
                        height="315"
                        src={`https://www.youtube.com/embed/${info.trailer.id}`}
                        title={`Trailer of ${info.title.english}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    >
                    </iframe>
                }
                <div className={`space-y-4 ${info?.trailer ? 'col-span-3' : 'col-span-5'}`}>
                    <ContentList params={params} headerText='Recommendations' data={info?.recommendations} />
                </div>
            </div>
        </>
    )
}

export default page