"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { Suspense, createElement, useState } from "react";
import Loading from "@/app/[services]/[provider]/loading";
import { HiOutlineRectangleStack, HiOutlineStar, HiOutlineCalendarDays } from "react-icons/hi2";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchData from "@/components/Datafetcher"

export function MiniDescription({ icon, text }) {
  return (
    <div className='flex'>
      {icon && createElement(icon, { size: 20 })}
      <span className='pl-2'>{text}</span>
    </div>
  )
}

const ContentList = ({ params, headerText, service, provider, otherParams, data, displayStyle }) => {
  console.log(params);

  const isArray = Array.isArray(data);
  const { currentPage, hasNextPage, results } = isArray ? {} : data;
  const [currPage, setCurrPage] = useState(isArray ? 1 : currentPage);
  const [items, setItems] = useState(isArray ? data : results);

  const fetchMoreData = async () => {
    console.log("i claed");
    const newData = await fetchData(service, provider, otherParams, { page: currPage + 1 })
    setCurrPage(currPage + 1)
    setItems(items.concat(isArray ? newData : newData.results));
    console.log("new", newData);
  }
  // console.log(data);
  console.log(items.length,"items");
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold tracking-tighter lg:text-3xl xl:text-4xl/relaxed px-4 font-pro-bold my-4">{headerText}</h1>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={hasNextPage}
        style={displayStyle === 'grid'
          ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem',justifyItems:'center' }
          : { display: 'flex', flexDirection: 'row' }}
        loader={<h1 className="text-red text-7xl">loading...</h1>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more anime/manga and movies</b>
          </p>
        }
        className="infinity-scroll"
      >
        {
          items.map((result) => {
            return (
              <div key={result.id} className='mx-4'>
                <Card className='overflow-hidden w-fit text-white border-none'>
                  <Image src={result.image} alt={service === 'movies' ? result.title : `${result.title.userPreferred} or ${result.title.english}`}
                    className="h-72 w-full object-contain" width={200} height={150} />
                  <CardHeader className='space-y-0 p-0 mt-4'>
                    <CardTitle className='px-2 text-lg font-bold overflow-hidden w-52 whitespace-nowrap overflow-ellipsis'>
                      {service === 'movies' ? result.title : result.title?.userPreferred ?? result.title?.english}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mx-4">
                      <Badge variant="secondary" className='py-1 px-2'>{result.type}</Badge>
                      <Link href={`/${params?.services}/${params?.provider}/info/${result.id}`} className="hover:underline transition-all duration-300 active:animate-ping">
                        Watch Now
                      </Link>
                    </div>
                  </CardHeader>
                  <div className={`p-4 text-white text-sm grid ${result?.episodeTitle ? 'grid-cols-1' : 'grid-cols-2'} `}>
                    {(result?.totalEpisodes || result?.episodeTitle || result?.latestEpisode) && (
                      <MiniDescription
                        icon={HiOutlineRectangleStack}
                        text={result?.totalEpisodes ?? result?.episodeTitle ?? result?.latestEpisode}
                      />
                    )}

                    {result?.rating && (
                      <MiniDescription icon={HiOutlineStar} text={(Number(result.rating) / 10).toFixed(1)} />
                    )}
                    {result?.releaseDate && (
                      <MiniDescription icon={HiOutlineCalendarDays} text={result.releaseDate} />
                    )}
                    {result?.trailer && (
                      <Link href={`https://www.youtube.com/watch?v=${result.trailer?.id}`} target="_blank" className='flex hover:underline'>
                        <FaYoutube size={20} color="#ff0000" />
                        <span className='pl-2'>Trailer</span>
                      </Link>
                    )}

                    {((service === 'movies' ? result?.duration : null) || result?.season) && (
                      <div className='flex'>
                        <span className='pl-2'>{result?.duration ?? result?.season}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
}

export default ContentList