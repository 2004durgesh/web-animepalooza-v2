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
  const animeEpisodeLinks = await fetchData(services, provider, `watch/${params.episode_id[0]}`)
  const moviesEpisodeLinks = params.provider !== "tmdb" ? (await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })) :
    (await fetchData(services, provider, `watch/${params.episode_id[0]}`, { id: `${params.episode_id[1]}/${params.episode_id[2]}` }))

  // let moviesEpisodeLinks = ""
  // if (params.services === "movies") {
  //   if (params.provider !== "tmdb") {
  //     moviesEpisodeLinks = await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })
  //   }
  //   else {
  //     moviesEpisodeLinks = await fetch(tmdbUrl, { cache: 'no-store' })
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(data => { console.log(data); return data })
  //       .catch(error => console.error('Error fetching data:', error));
  //   }
  // }
  // const moviesEpisodeLinks = params.services === "movies"
  //   ?
  //   provider !== "tmdb" && await fetchData(services, provider, `watch`, { episodeId: params.episode_id[0], mediaId: `${params.episode_id[1]}/${params.episode_id[2]}` })
  //   :
  //   await fetch(tmdbUrl, { cache: 'no-store' })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => { console.log(data); return data })
  //     .catch(error => console.error('Error fetching data:', error));


  const episodeLinks = params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;
  const sourceLink = params.services === 'anime' ? episodeLinks.sources[4].url : params.provider === "dramacool" ? episodeLinks.sources[0].url : episodeLinks.sources[3].url;
  const subtitles = episodeLinks.subtitles ? episodeLinks.subtitles : null;
  // console.log("episodeLinks...........",episodeLinks)
  return (
    <Suspense fallback={<Loading />}>
      <main>
        {/* {SearchParams} */}
        {/* {JSON.stringify(subtitle)} */}
        <VideoPlayer sourceLink={sourceLink} subtitles={subtitles}/>
      </main>
    </Suspense>
  )
}

export default page