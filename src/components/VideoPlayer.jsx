"use client";
import React, { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { useMediaQuery } from 'react-responsive'
import { MediaPlayer, MediaProvider, useMediaRemote, Poster, ToggleButton, Track, Tooltip, SeekButton, ChapterTitle, useStore, MediaPlayerInstance, Controls } from "@vidstack/react"
import { DownloadIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon } from '@vidstack/react/icons';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import SeekForward85Icon from './SeekForward85Icon';
import Link from 'next/link';
import EpisodeListSidebar from './EpisodeListSidebar';

const VideoPlayer = ({ params, sourceLink, subtitles, downloadLink, currentPlayingEpisodeId, episodes, info }) => {
  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const episodeNumber = searchParams.get('episode-number')
  const seasonNumber = searchParams.get('season-number')
  const thumbnail = searchParams.get('thumbnail')
  const ref = useRef(null);
  const { controlsVisible, mediaWidth, paused, fullscreen } = useStore(MediaPlayerInstance, ref);
  const remote = useMediaRemote();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  console.warn(seasonNumber, "seasonNumber");
  const smallVideoLayoutQuery = useCallback(({ width, height }) => {
    return width < 576 || height < 380;
  }, []);
  const isTmdbProvider = params.provider === 'tmdb';
  const seasonEpisodes = isTmdbProvider && episodes && seasonNumber !== undefined && episodes[Number(seasonNumber)] ? episodes[Number(seasonNumber)] : episodes;
  return <>
    <MediaPlayer
      ref={ref}
      title={!fullscreen && title}
      src={sourceLink}
      crossOrigin
      viewType='video'
      streamType='on-demand'
      logLevel='warn'
      poster={thumbnail}
      playsInline
      autoPlay
      keyTarget='document'
      className='relative'
      style={{ width: isSmallScreen ? '100%' : '50%', height: isSmallScreen ? 'auto' : '50vh' }}
    >
      <MediaProvider>
        {fullscreen && controlsVisible && mediaWidth > 576 && <ChapterTitle className='text-white absolute top-0 p-4'>
          <p className='font-bold font-pro-bold text-lg'>{title}</p>
          {episodeNumber && <p className='font-medium font-pro-medium text-sm italic'>Episode {episodeNumber}</p>}
        </ChapterTitle>}
        {params.provider !== "dramacool" && subtitles && subtitles.map((subtitle, index) => (
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

      <Controls.Root className="vds-controls ">
        <div className="vds-controls-spacer" />
        <Controls.Group className="vds-controls-group">
          {fullscreen && controlsVisible && mediaWidth > 576 && (
            <>
              <div>
                <div className="vds-controls-spacer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <PreviousIcon size={32} /> */}
                  <ToggleButton
                    onClick={(e) => (paused ? remote.play(e) : remote.pause(e))}
                    className='bg-black/60 hover:!bg-black/60 size-14 flex items-center justify-center rounded-full backdrop-blur-md shadow '
                  >
                    {paused ? <PlayIcon size={35} /> : <PauseIcon size={35} />}
                  </ToggleButton>
                  {/* <NextIcon size={32} /> */}
                </div>
                <div className="vds-controls-spacer" />
              </div>
            </>
          )}
        </Controls.Group>
        <div className="vds-controls-spacer" />
      </Controls.Root>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        smallLayoutWhen={smallVideoLayoutQuery}
        colorScheme='dark'
        noScrubGesture={true}
        slots={mediaWidth > 1000 && {
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
        thumbnails={params.provider === "dramacool" && subtitles && subtitles[0].url}
      />
    </MediaPlayer>
    <div className='md:w-[40%]'>
      <EpisodeListSidebar episodes={seasonEpisodes} params={params} info={info} currentPlayingEpisodeId={currentPlayingEpisodeId} seasonNumber={seasonNumber} />
    </div>
  </>
};

export default VideoPlayer;