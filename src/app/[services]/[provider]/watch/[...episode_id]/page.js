import React from 'react'
import fetchData from "@/components/Datafetcher"

const page = async({params}) => {
  let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
  let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
  const animeEpisodeLinks=await fetchData(services, provider, `watch/${params.episode_id}`)
  const moviesEpisodeLinks = await fetchData(services, provider, `watch`, {episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}`});
  return (
    <div>{JSON.stringify(moviesEpisodeLinks)}</div>
  )
}

export default page