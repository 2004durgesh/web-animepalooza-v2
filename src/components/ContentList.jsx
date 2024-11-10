'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from './ui/button';
import { StarIcon, CardStackIcon } from '@radix-ui/react-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchData from '../components/Datafetcher';

export function MiniDescription({ icon, text }) {
  return (
    <div className='flex items-center'>
      {icon && createElement(icon, { size: 20 })}
      <span className='pl-2'>{text}</span>
    </div>
  );
}

const ContentList = ({
  params,
  headerText,
  services,
  provider,
  otherParams,
  data,
  displayStyle,
}) => {
  const isArray = Array.isArray(data);
  const { currentPage, hasNextPage, results } = isArray ? {} : data;
  const [currPage, setCurrPage] = useState(isArray ? 1 : currentPage);
  const [items, setItems] = useState(isArray ? data : results);

  useEffect(() => {
    setItems(isArray ? data : results);
  }, [data, results, isArray]);

  const fetchMoreData = async () => {
    // console.log("i was called from contentlist.jsx");
    const newData = await fetchData(services, provider, otherParams, {
      page: Number(currPage) + 1,
    });
    setCurrPage(Number(currPage) + 1);
    setItems(items.concat(isArray ? newData : newData.results));
    console.log('new', newData);
  };
  // console.log(provider, data);
  // console.log(items.length,"items");

  return (
    <div>
      <h1 className='my-4 px-4 font-pro-bold text-2xl font-bold tracking-tighter text-primary lg:text-3xl xl:text-4xl/relaxed'>
        {headerText}
      </h1>
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchMoreData}
        hasMore={false || hasNextPage}
        style={
          displayStyle === 'grid'
            ? {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
                justifyItems: 'center',
              }
            : { display: 'flex', flexDirection: 'row' }
        }
        loader={<h1 className='text-red text-7xl'>loading...</h1>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more anime/manga and movies</b>
          </p>
        }
        className='infinity-scroll'
      >
        {items?.map(
          (result) =>
            !result?.image?.includes('null') && (
              <CardItem
                key={result?.id}
                result={result}
                services={services}
                provider={provider}
                params={params}
              />
            )
        )}
      </InfiniteScroll>
    </div>
  );
};

const CardItem = ({ result, services, provider, params }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='mx-1'>
      <Link
        asChild
        prefetch
        href={
          provider === 'tmdb'
            ? `/${params?.services}/${params?.provider}/info/${result?.id}/${result?.type?.split(' ')[0].toLowerCase()}`
            : services === 'favorites'
              ? `/${result?.services}/${result?.provider}/info/${result?.id}`
              : `/${params?.services}/${params?.provider}/info/${result?.id}`
        }
        className=''
      >
        <Card
          className='relative h-[190px] w-[135px] overflow-hidden rounded-lg border-none shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl xl:h-[265px] xl:w-[185px]'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className='h-full p-0'>
            <motion.div
              className='h-full w-full'
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                unoptimized
                src={result?.image}
                alt={
                  services === 'movies' || provider === 'tmdb' || services === 'favorites'
                    ? result?.title
                    : `${result?.title?.userPreferred} or ${result?.title?.english}`
                }
                width={200}
                height={150}
                className='h-full w-full object-cover'
              />
            </motion.div>
            <motion.div
              className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent p-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className='line-clamp-1 w-full text-[15px] font-bold text-primary-foreground xl:text-base'>
                {services === 'movies' || provider === 'tmdb' || services === 'favorites'
                  ? result?.title
                  : (result?.title?.userPreferred ?? result?.title?.english)}
              </CardTitle>
              <div className='flex items-center justify-between text-xs text-primary-foreground'>
                {result?.rating && (
                  <div className='flex items-center'>
                    <StarIcon className='mr-1 h-4 w-4 text-yellow-400' />
                    <span>
                      {provider === 'tmdb'
                        ? result?.rating.toFixed(1)
                        : (Number(result?.rating) / 10).toFixed(1)}
                    </span>
                  </div>
                )}
                {/* {result?.type && <Badge variant="destructive" className='py-1 px-2'>{result?.type}</Badge>} */}
                {(result?.totalEpisodes || result?.episodeTitle || result?.latestEpisode) && (
                  <div className='flex items-center'>
                    <CardStackIcon className='mr-1 h-4 w-4' />
                    <span>
                      {result?.totalEpisodes ?? result?.episodeTitle ?? result?.latestEpisode}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ContentList;
