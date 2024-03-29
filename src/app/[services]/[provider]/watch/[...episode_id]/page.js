import React from 'react'
import fetchData from "@/components/Datafetcher"
import VideoPlayer from '@/components/VideoPlayer';

const page = async ({ params }) => {
  let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
  let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
  const animeEpisodeLinks = await fetchData(services, provider, `watch/${params.episode_id[0]}`)
  const moviesEpisodeLinks = await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` });
  const episodeLinks = params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;
  return (
    <main>
      {/* {JSON.stringify(params,episodeLinks)} */}
      <VideoPlayer links={episodeLinks}/>
    </main>
  )
}

export default page