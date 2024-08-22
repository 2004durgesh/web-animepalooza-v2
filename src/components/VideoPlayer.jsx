"use client";
import React, { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiOutlineForward, HiForward } from "react-icons/hi2";
// import { DownloadIcon } from '@vidstack/react/icons';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, Poster, ToggleButton, Track, Tooltip, SeekButton, ChapterTitle } from "@vidstack/react"
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import SeekForward85Icon from './SeekForward85Icon';
import DownloadIcon from './DownloadIcon';
import Link from 'next/link';



const VideoPlayer = ({ provider, sourceLink, subtitles, downloadLink }) => {
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
        <ChapterTitle className=' text-white absolute top-0 p-4'>
          <p className='font-bold font-pro-bold text-lg'>{title}</p>
          {episodeNumber&&<p className='font-medium font-pro-medium text-sm italic'>Episode {episodeNumber}</p>}
        </ChapterTitle>
        {provider !== "dramacool" && subtitles && subtitles.map((subtitle, index) => (
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
        noScrubGesture={true}
        slots={{
          afterSettingsMenu: (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleButton
                  className="vds-button"
                  aria-label="Skip 85 seconds">
                  <SeekButton seconds={85}>
                    <SeekForward85Icon size={32} />
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

          ),
          beforeSettingsMenu: (
            downloadLink && <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleButton
                  className="vds-button"
                  aria-label="Download">
                  <Link href={downloadLink}>
                    <DownloadIcon size={32} />
                  </Link>
                </ToggleButton>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white border border-gray-400/20"
                placement="top start"
              >
                Download
              </Tooltip.Content>
            </Tooltip.Root>
          )
        }}
        // download={{url:downloadLink}} 
        thumbnails={provider === "dramacool" && subtitles && subtitles[0].url}
      />
    </MediaPlayer>
  </>
};

export default VideoPlayer;