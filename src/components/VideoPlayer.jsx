'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { useMediaQuery } from 'react-responsive';
import {
  MediaPlayer,
  MediaProvider,
  useMediaRemote,
  Poster,
  ToggleButton,
  Track,
  Tooltip,
  SeekButton,
  ChapterTitle,
  useStore,
  MediaPlayerInstance,
  Controls,
} from '@vidstack/react';
import { DownloadIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon } from '@vidstack/react/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import SeekForward85Icon from './SeekForward85Icon';
import Link from 'next/link';
import EpisodeListSidebar from './EpisodeListSidebar';
import { decryptData } from './crypto';
import { parseQueryString } from '@/lib/utils';

const VideoPlayer = ({
  params,
  sourceLink,
  subtitles,
  downloadLink,
  currentPlayingEpisodeId,
  episodes,
  info,
}) => {
  const searchParams = useSearchParams();
  const encryptedData = searchParams.get('data');

  const decryptedData = decryptData(
    decodeURIComponent(encryptedData),
    process.env.NEXT_PUBLIC_CRYPTO_KEY
  );
  const queryParams = parseQueryString(decryptedData);
  const title = queryParams.title;
  const episodeNumber = queryParams.episodeNumber;
  const seasonNumber = queryParams.seasonNumber;
  const thumbnail = queryParams.thumbnail;
  const ref = useRef(null);
  const { controlsVisible, mediaWidth, paused, fullscreen } = useStore(MediaPlayerInstance, ref);
  const remote = useMediaRemote();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const smallVideoLayoutQuery = useCallback(({ width, height }) => {
    return width < 576 || height < 380;
  }, []);
  const isTmdbProvider = params.provider === 'tmdb';
  const seasonEpisodes =
    isTmdbProvider && episodes && seasonNumber !== undefined && episodes[Number(seasonNumber)]
      ? episodes[Number(seasonNumber)]
      : episodes;
  return (
    <>
      <div className='flex w-auto flex-col md:w-[50vw]'>
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
          style={{ width: '100%', height: isSmallScreen ? 'auto' : '50vh' }}
        >
          <MediaProvider>
            {fullscreen && controlsVisible && mediaWidth > 576 && (
              <ChapterTitle className='absolute top-0 p-4 text-white'>
                <p className='font-pro-bold text-lg font-bold'>{title}</p>
                {episodeNumber && (
                  <p className='font-pro-medium text-sm font-medium italic'>
                    Episode {episodeNumber}
                  </p>
                )}
              </ChapterTitle>
            )}
            {params.provider !== 'dramacool' &&
              subtitles &&
              subtitles.map((subtitle, index) => (
                <Track
                  key={index}
                  src={subtitle.url}
                  kind='subtitles'
                  lang={subtitle.lang}
                  label={subtitle.lang}
                  default={index === 0}
                />
              ))}
            <Poster src={thumbnail} className='vds-poster object-contain' />
          </MediaProvider>

          <Controls.Root className='vds-controls'>
            <div className='vds-controls-spacer' />
            <Controls.Group className='vds-controls-group'>
              {fullscreen && controlsVisible && mediaWidth > 576 && (
                <>
                  <div>
                    <div className='vds-controls-spacer' />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      {/* <PreviousIcon size={32} /> */}
                      <ToggleButton
                        onClick={(e) => (paused ? remote.play(e) : remote.pause(e))}
                        className='flex size-14 items-center justify-center rounded-full bg-black/60 shadow backdrop-blur-md hover:!bg-black/60'
                      >
                        {paused ? <PlayIcon size={35} /> : <PauseIcon size={35} />}
                      </ToggleButton>
                      {/* <NextIcon size={32} /> */}
                    </div>
                    <div className='vds-controls-spacer' />
                  </div>
                </>
              )}
            </Controls.Group>
            <div className='vds-controls-spacer' />
          </Controls.Root>
          <DefaultVideoLayout
            icons={defaultLayoutIcons}
            smallLayoutWhen={smallVideoLayoutQuery}
            colorScheme='dark'
            noScrubGesture={true}
            slots={
              mediaWidth > 576 && {
                afterSettingsMenu: (
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <ToggleButton className='vds-button' aria-label='Skip 85 seconds'>
                        <SeekButton seconds={85}>
                          <SeekForward85Icon size={32} />
                        </SeekButton>
                      </ToggleButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      className='z-10 rounded-sm border border-gray-400/20 bg-black/90 px-2 py-0.5 text-sm font-medium text-white animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4'
                      placement='top start'
                    >
                      Skip +85s
                    </Tooltip.Content>
                  </Tooltip.Root>
                ),
                beforeSettingsMenu: downloadLink && (
                  <Link href={downloadLink} aria-label='download' className='vds-button'>
                    <DownloadIcon size={32} />
                  </Link>
                ),
              }
            }
            // download={{url:downloadLink}}
            // thumbnails={params.provider === 'dramacool' && subtitles && subtitles[0].url}
            thumbnails='https://api.allorigins.win/raw?url=https://voe.sx/engine/storyboard/zm0wvpglgaww?t=1'
          />
        </MediaPlayer>
        {seasonEpisodes?.map((episode, index) =>
          episode.id === currentPlayingEpisodeId && episode?.description ? (
            <Accordion type='single' collapsible key={episode.id}>
              <AccordionItem value='description'>
                <AccordionTrigger>
                  <h1 className='pro-bold text-lg font-bold sm:text-xl'>Description: </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <p className='pro-regular text-xs sm:text-sm md:text-base lg:text-lg'>
                    {String(episode?.description)}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null
        )}
      </div>
      <div className='md:w-[40%]'>
        <EpisodeListSidebar
          episodes={seasonEpisodes}
          params={params}
          info={info}
          currentPlayingEpisodeId={currentPlayingEpisodeId}
          seasonNumber={seasonNumber}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
