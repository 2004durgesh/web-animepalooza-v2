import React from 'react'
import fetchData from '@/components/Datafetcher'
import Image from 'next/image';
import parse from 'html-react-parser';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5"


const page = async ({ params }) => {
    const info = await fetchData('meta', 'anilist', `data/${params.info_id[0]}`, { provider: params.provider })
    // console.log(info);
    const airingDate = new Date(info?.nextAiringEpisode?.airingTime * 1000);
    const ExtraInfoItem = ({ label, children }) => (
        <p className='text-white text-lg'>
            <strong>{label}: </strong>
            <span>{children}</span>
        </p>
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
                            <span>{info.type}</span>
                            <span className='flex items-center'><HiOutlineCalendarDays size={20} />{info.releaseDate}</span>
                            <span className='flex items-center'><HiOutlineRectangleStack size={20} />{info.totalEpisodes}</span>
                        </div>
                    </div>
                    <Image src={info.image} alt={info.title.english} height={284} width={203} className='mx-auto h-full w-auto order-2' />
                    <div className='self-center md:self-end my-4 w-full md:w-1/3 order-3'>
                        <div className='flex flex-wrap divide-x-2 gap-x-2'>
                            <span className='flex items-center'>{info.status === "Completed" ?
                                <><IoCheckmarkDoneOutline size={20} /> {info.status}</>
                                :
                                <><HiOutlineClock size={20} /> {info.status}</>}</span>
                            <span className='flex items-center'><HiOutlineStar size={20} />{(Number(info.rating) / 10).toFixed(1)}</span>
                            {info.status !== "Completed" && <span className='text-nowrap'>Ep {info.nextAiringEpisode.episode}, {airingDate.toDateString()}</span>}
                        </div>
                        {info.genres.map((genre, index) => {
                            return (
                                <Badge variant="outline" key={index} className='m-1 text-white'>{genre}</Badge>
                            )

                        })}
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
            <div>
                <ExtraInfoItem label="Other Names: ">
                    {info.synonyms.map((item) => (
                        <Badge key={item} variant="outline" className='m-1 text-white'>{item}</Badge>
                    ))}
                </ExtraInfoItem>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="description">
                    <AccordionTrigger>
                        <h1 className='font-bold text-xl pro-bold'>Description: </h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <span className='pro-regular text-sm sm:text-lg'>{parse(info.description)}</span>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}

export default page