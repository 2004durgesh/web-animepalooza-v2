"use client";
import React, { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiOutlineForward, HiForward } from "react-icons/hi2";
// import { FastForwardIcon } from '@vidstack/react/icons';
import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, ToggleButton, Track, Tooltip, SeekButton } from "@vidstack/react"
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { Button } from './ui/button';



const VideoPlayer = ({ provider,sourceLink, subtitles ,downloadLink}) => {
  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const episodeNumber = searchParams.get('episode-number')
  const thumbnail = searchParams.get('thumbnail')
  const smallVideoLayoutQuery = useCallback(({ width, height }) => {
    return width < 576 || height < 380;
  }, []);



  return <>
    <MediaPlayer
    title={title}
    src={sourceLink}
    crossOrigin
    viewType='video'
    streamType='on-demand'
    logLevel='warn'
    poster={thumbnail}
    playsInline
    autoPlay
    keyTarget='document'
  >
    <MediaProvider>
      {provider!=="dramacool"&&subtitles && subtitles.map((subtitle, index) => (
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
      slots={{
        afterSettingsMenu: (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <ToggleButton
                className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 hover:scale-110 transition-all duration-300"
                aria-label="Like video">
                <SeekButton seconds={85}>
                <HiForward size={32} />
                </SeekButton>
              </ToggleButton>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white border border-gray-400/20"
              placement="top start"
            >
              Skip +85s
            </Tooltip.Content>
          </Tooltip.Root>

        )
      }}
    download={{url:downloadLink}} 
    thumbnails={subtitles[0].url}
    />
  </MediaPlayer>
  </>
};

export default VideoPlayer;