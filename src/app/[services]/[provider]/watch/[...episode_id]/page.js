import React, { Suspense } from 'react'
import fetchData from "@/components/Datafetcher"
import VideoPlayer from '@/components/VideoPlayer';
import Loading from '../loading';

const page = async ({ params }) => {
  // await new Promise(resolve => setTimeout(resolve, 5000))
  let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
  let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
  let tmdbUrl=`https://animepalooza.vercel.app/api/${params.episode_id[0]}?s=${params.episode_id[3]}&e=${params.episode_id[4]}`
  console.log("tmdburl",tmdbUrl)
  const animeEpisodeLinks = await fetchData(services, provider, `watch/${params.episode_id[0]}`)
  const moviesEpisodeLinks=await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })
  // const moviesEpisodeLinks = (params.services === "movies" && provider !== "tmdb")
  //   ?
  //   await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })
  //   :
  //   await fetch(tmdbUrl)
  //   .then(res => {
  //       console.log(res);
  //       return res.json();
  //   })
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error fetching data:', error));

  const episodeLinks = params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;
  const sourceLink = params.services === 'anime' ? episodeLinks.sources[4].url : params.provider === "tmdb" ? episodeLinks.source: episodeLinks.sources[0].url;
  return (
    <Suspense fallback={<Loading />}>
      <main>
        {/* {SearchParams} */}
        {/* {JSON.stringify(episodeLinks)} */}
        <VideoPlayer sourceLink={sourceLink} services={services}/>
      </main>
    </Suspense>
  )
}

export default page