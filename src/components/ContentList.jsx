"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { Suspense, createElement } from "react";
import Loading from "@/app/(services)/loading";
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays } from "react-icons/hi2";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

export function MiniDescription({ icon, text }) {
  return (
    <div className='flex'>
      {icon && createElement(icon, { size: 20 })}
      <span className='pl-2'>{text}</span>
    </div>
  )
}

const ContentList = ({ headerText, data }) => {
  const { currentPage, hasNextPage, results } = data;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-4 font-pro-bold my-4">{headerText}</h1>
        <Carousel className=''
          plugins={[
            // Autoplay({
            //   delay: 2000,
            // }),
          ]}>
          <CarouselContent className='mx-4'>
            {
              results.map((result) => {
                return (
                  <CarouselItem key={result.id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
                    <Card className='overflow-hidden w-fit text-white border-none'>
                      <Image src={result.image} alt={`${result.title.userPreferred} or ${result.title.english}`} className="h-80 w-auto object-contain" width={200} height={200} />
                      <CardHeader className='space-y-0 p-0 mt-4'>
                        <CardTitle className='px-2 text-lg font-bold overflow-hidden w-52 whitespace-nowrap overflow-ellipsis'>{result.title.userPreferred}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mx-4">
                          <Badge variant="secondary" className='py-1 px-2'>{result.type}</Badge>
                          <Link href="#" className="hover:underline transition-all duration-300 active:animate-ping">
                            Watch Now
                          </Link>
                        </div>
                      </CardHeader>
                      <div className='p-4 text-white text-sm'>
                        <div className="flex space-x-8 ">
                          {result.totalEpisodes && (
                            <MiniDescription icon={HiOutlineRectangleStack} text={result.totalEpisodes} />
                          )}
                          {result.rating && (
                            <MiniDescription icon={HiOutlineStar} text={(Number(result.rating) / 10).toFixed(1)} />
                          )}
                        </div>
                        <div className="flex space-x-8">
                          {result.releaseDate && (
                            <MiniDescription icon={HiOutlineCalendarDays} text={result.releaseDate} />
                          )}
                          {result.releaseDate && (
                            <Link href={`https://www.youtube.com/watch?v=${result.trailer.id}`} target="_blank" className='flex hover:underline'>
                              <FaYoutube size={20} color="#ff0000" />
                              <span className='pl-2'>Trailer</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                )
              })
            }
          </CarouselContent>
        </Carousel>
      </Suspense>
    </>
  )
}

export default ContentList