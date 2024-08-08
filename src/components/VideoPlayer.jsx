"use client";
import React, { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react"
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';


const VideoPlayer = ({ sourceLink, subtitles }) => {
  const searchParams = useSearchParams()

  const title = searchParams.get('title')
  const episodeNumber = searchParams.get('episode-number')
  const thumbnail = searchParams.get('thumbnail')
  const smallVideoLayoutQuery = useCallback(({ width, height }) => {
    return width < 576 || height < 380;
  }, []);
  return <MediaPlayer
    className="-mt-16 w-full aspect-video ring-media-focus data-[focus]:ring-4 relative"
    title={title}
    src={sourceLink}
    crossOrigin
    viewType='video'
    streamType='on-demand'
    logLevel='warn'
    poster={thumbnail}
    playsInline>
    <MediaProvider>
      {subtitles && subtitles.map((subtitle, index) => (
        <Track
          key={index}
          src={subtitle.url}
          kind="subtitles"
          lang={subtitle.lang}
          label={subtitle.lang}
          default={index === 0}
        />
      ))}
      <Poster className="vds-poster object-contain" />
    </MediaProvider>
    <DefaultVideoLayout
      icons={defaultLayoutIcons}
      smallLayoutWhen={smallVideoLayoutQuery}
      colorScheme='dark'
    />
  </MediaPlayer>
};

export default VideoPlayer;