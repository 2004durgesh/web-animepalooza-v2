"use client";
import React, { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider, useMediaRemote, Poster, ToggleButton, Track, Tooltip, SeekButton, ChapterTitle, useStore, MediaPlayerInstance, Controls } from "@vidstack/react"
import { DownloadIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon } from '@vidstack/react/icons';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import SeekForward85Icon from './SeekForward85Icon';
import Link from 'next/link';


const VideoPlayer = ({ provider, sourceLink, subtitles, downloadLink }) => {
  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const episodeNumber = searchParams.get('episode-number')
  const thumbnail = searchParams.get('thumbnail')
  const ref = useRef(null);
  const { controlsVisible, mediaWidth, paused } = useStore(MediaPlayerInstance, ref);
  const remote = useMediaRemote();

  const smallVideoLayoutQuery = useCallback(({ width, height }) => {
    return width < 576 || height < 380;
  }, []);

  return <>
    <MediaPlayer
      ref={ref}
      title={mediaWidth < 576 && title}
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
        {controlsVisible && mediaWidth > 576 && <ChapterTitle className='text-white absolute top-0 p-4'>
          <p className='font-bold font-pro-bold text-lg'>{title}</p>
          {episodeNumber && <p className='font-medium font-pro-medium text-sm italic'>Episode {episodeNumber}</p>}
        </ChapterTitle>}
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
        <Poster src={thumbnail} className="vds-poster object-contain" />

      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        smallLayoutWhen={smallVideoLayoutQuery}
        colorScheme='dark'
        noScrubGesture={true}
        slots={mediaWidth > 576 && {
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
          ),
          beforeLoadButton: (
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
          )
        }}
        // download={{url:downloadLink}} 
        thumbnails={provider === "dramacool" && subtitles && subtitles[0].url}
      />
      <Controls.Root className="vds-controls ">
        <div className="vds-controls-spacer" />
        <Controls.Group className="vds-controls-group">
          {controlsVisible && mediaWidth > 576 && (
            <div className="w-full h-52 gap-8 flex-center media-buffering:hidden">
              <div className='flex absolute items-center gap-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                {/* <PreviousIcon size={32} /> */}
                <ToggleButton
                  onClick={(e) => (paused ? remote.play(e) : remote.pause(e))}
                  className='bg-white/10 hover:!bg-white/10 size-14 flex items-center justify-center rounded-full backdrop-blur-md shadow '
                >
                  {paused ? <PlayIcon size={35} /> : <PauseIcon size={35} />}
                </ToggleButton>
                {/* <NextIcon size={32} /> */}
              </div>
            </div>
          )}
        </Controls.Group>
        <div className="vds-controls-spacer" />
      </Controls.Root>
    </MediaPlayer>
  </>
};

export default VideoPlayer;