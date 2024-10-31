import React, { Suspense } from 'react';
import fetchData from '@/components/Datafetcher';
import VideoPlayer from '@/components/VideoPlayer';
import { VideoPlayerSkeleton } from '../loading';

const page = async ({ params }) => {
  // await new Promise(resolve => setTimeout(resolve, 5000))
  let services =
    params.services === 'anime' || params.provider === 'tmdb'
      ? 'meta'
      : params.services;
  let provider =
    params.services === 'anime' || params.services === 'manga'
      ? 'anilist'
      : params.provider;
  const animeEpisodeLinks =
    params.services === 'anime' &&
    (await fetchData(services, provider, `watch/${params.episode_id[0]}`));
  const moviesEpisodeLinks =
    params.services === 'movies' && params.provider !== 'tmdb'
      ? await fetchData(services, provider, `watch`, {
          episodeId: params.episode_id[0],
          mediaId: `${params.episode_id[1]}/${params.episode_id[2]}`,
        })
      : await fetchData(services, provider, `watch/${params.episode_id[0]}`, {
          id: `${params.episode_id[1]}/${params.episode_id[2]}`,
        });

  let animeInfo =
    params.services === 'anime'
      ? await fetchData(services, provider, `data/${params.episode_id[1]}`, {
          provider: params.provider,
        })
      : null;

  let movieInfo =
    params.services === 'movies'
      ? provider !== 'tmdb'
        ? await fetchData(services, provider, `info`, {
            id: `${params.episode_id.slice(1, 3).join('/')}`,
          })
        : await fetchData(services, provider, `info/${params.episode_id[3]}`, {
            type: params.episode_id[1],
          })
      : null;

  const info = params.services === 'anime' ? animeInfo : movieInfo;

  const episodes =
    params.services === 'anime'
      ? await fetchData(
          services,
          provider,
          `episodes/${params.episode_id[1]}`,
          { provider: params.provider }
        )
      : params.provider === 'tmdb'
        ? info?.seasons?.map(
            (season, index) => season?.episodes ?? info?.seasons
          )
        : movieInfo?.episodes;

  const moviesEpisode =
    provider === 'tmdb' && params.episode_id[1] === 'movie'
      ? [
          {
            id: info?.episodeId || 'N/A',
            title: info?.title || 'No Title',
            description: info?.description || 'No Description',
            releaseDate: info?.releaseDate || 'No Release Date',
            img: {
              mobile: info?.cover || 'default-mobile-cover.jpg',
              hd: info?.cover || 'default-hd-cover.jpg',
            },
          },
        ]
      : null;

  const episodeLinks =
    params.services === 'anime' ? animeEpisodeLinks : moviesEpisodeLinks;

  console.log(episodeLinks);
  const sourceLink = Array.isArray(episodeLinks?.sources)
    ? episodeLinks.sources?.map((source, index) => {
        if (source?.quality === 'default' || source?.quality === 'backup') {
          return source?.url;
        } else return source?.url;
      })
    : episodeLinks?.sources?.url;
  const subtitles = episodeLinks.subtitles ? episodeLinks.subtitles : null;
  const downloadLink = episodeLinks.download ? episodeLinks.download : null;
  const headers = episodeLinks.headers ? episodeLinks.headers : null;
  // const proxiedLink=`https://m3u8-url-proxy.vercel.app/m3u8-proxy?url=${encodeURIComponent(sourceLink)}&headers=${encodeURIComponent(JSON.stringify(headers))}`
  return (
    <Suspense fallback={<VideoPlayerSkeleton />}>
      <main className='m-4 -mt-12 flex flex-col justify-center gap-4 md:flex-row md:justify-between'>
        {/* {SearchParams} */}
        {/* {JSON.stringify(`${episodeLinks}`)} */}
        <VideoPlayer
          params={params}
          sourceLink={sourceLink}
          subtitles={subtitles}
          downloadLink={downloadLink}
          currentPlayingEpisodeId={params.episode_id[0]}
          episodes={episodes || moviesEpisode}
          info={info}
        />
      </main>
    </Suspense>
  );
};

export default page;
