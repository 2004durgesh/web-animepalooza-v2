import Link from 'next/link'
import React from 'react'
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
const EpisodeCard = ({episodes,params,info}) => {
    return (
        <section className='my-4'>
            <h2 className='text-lg font-semibold font-pro-medium text-primary'>Episodes</h2>
            <ScrollArea>
                <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 ${episodes.length > 5 ? "h-[75vh]" : null}`}>
                    {episodes&&episodes?.map((episode, index) => (
                        <Card key={episode.id} className="border sm:max-w-1/2 md:max-w-1/3 lg:max-w-1/4">
                            <CardHeader>
                                <Link
                                    href={`/${params?.services}/${params?.provider}/watch/${episode?.id}/${info.id}/?title=${encodeURIComponent(episode?.title ?? info?.title?.english ?? info?.title)}&thumbnail=${encodeURIComponent(episode?.image ?? episode?.img?.hd ?? info?.cover ?? info?.image)}&episode-number=${encodeURIComponent((episode?.number ?? episode?.episode) || '')}`}
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
        </section>
    )
}

export default EpisodeCard