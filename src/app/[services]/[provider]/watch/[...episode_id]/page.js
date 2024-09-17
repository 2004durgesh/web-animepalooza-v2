import React, { Suspense } from 'react'
import fetchData from "@/components/Datafetcher"
import VideoPlayer from '@/components/VideoPlayer';
import Loading from '../loading';

const page = async ({ params }) => {
  // await new Promise(resolve => setTimeout(resolve, 5000))
  let services = params.services === 'anime' || params.provider === 'tmdb' ? 'meta' : params.services;
  let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
  // let tmdbUrl = `https://animepalooza.vercel.app/api/${params.episode_id[0]}?s=${params.episode_id[3]}&e=${params.episode_id[4]}`
  // console.log("tmdburl", tmdbUrl)
  const animeEpisodeLinks = (params.services === 'anime') && await fetchData(services, provider, `watch/${params.episode_id[0]}`)
  const moviesEpisodeLinks = (params.services === "movies") && params.provider !== "tmdb" ? (await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })) :
    (await fetchData(services, provider, `watch/${params.episode_id[0]}`, { id: `${params.episode_id[1]}/${params.episode_id[2]}` }))

  const episodeLinks = params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;
  const sourceLink = params.services === 'anime' ? episodeLinks.sources[4].url : params.provider === "dramacool" ? episodeLinks.sources[0].url : episodeLinks.sources[3].url;
  const subtitles = episodeLinks.subtitles ? episodeLinks.subtitles : null;
  const downloadLink = episodeLinks.download ? episodeLinks.download : null;
  const headers = episodeLinks.headers ? episodeLinks.headers : null;
  // console.log("episodeLinks...........",episodeLinks)

  // const proxiedLink=`https://m3u8-url-proxy.vercel.app/m3u8-proxy?url=${encodeURIComponent(sourceLink)}&headers=${encodeURIComponent(JSON.stringify(headers))}`
  return (
    <Suspense fallback={<Loading />}>
      <main
        className='-mt-16 flex md:justify-between justify-center m-4 md:flex-row flex-col gap-4'
      >
        {/* {SearchParams} */}
        {/* {JSON.stringify(`${params.episode_id[0]}/${params.episode_id[1]}/${params.episode_id[2]}`)} */}
        <VideoPlayer
          params={params}
          sourceLink={sourceLink}
          subtitles={subtitles}
          downloadLink={downloadLink}
          currentPlayingEpisodeId={params.episode_id[0]}
        />
      </main>
    </Suspense>
  )
}

export default page