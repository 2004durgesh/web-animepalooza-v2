import React,{Suspense} from 'react'
import fetchData from "@/components/Datafetcher"
import VideoPlayer from '@/components/VideoPlayer';
import Loading from '../loading';

const page = async ({ params }) => {
  // await new Promise(resolve => setTimeout(resolve, 5000))
  let videoTitle=params.episode_id[0].split("-").join(" ");
  let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
  let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
  const animeEpisodeLinks = await fetchData(services, provider, `watch/${params.episode_id[0]}`)
  const moviesEpisodeLinks = await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` });
  const episodeLinks = params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;
  return (
    <Suspense fallback={<Loading/>}>
      <main>
      {/* {SearchParams} */}
        {/* {JSON.stringify(videoTitle)} */}
        <VideoPlayer links={episodeLinks} title={videoTitle}/>
      </main>
    </Suspense>
  )
}

export default page