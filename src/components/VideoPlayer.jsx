"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdOutlinePlayArrow, MdOutlinePause, MdOutlinePictureInPictureAlt, MdClosedCaptionOff } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import IconText from './IconText';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';



const VideoPlayer = ({ sourceLink, services }) => {
  const videoRef = useRef();
  const hlsRef = useRef();
  const searchParams = useSearchParams()

  const title = searchParams.get('title')
  const episodeNumber = searchParams.get('episode-number')
  const thumbnail = searchParams.get('thumbnail')
  const [togglePlayAndPause, setTogglePlayAndPause] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skipPlusTen, setSkipPlusTen] = useState(false);
  const [skipMinusTen, setSkipMinusTen] = useState(false);

  const qualityLevels = services === "meta" ? [360, 480, 720, 1080] : [360, 480, 720]
  const [currentQuality, setCurrentQuality] = useState(qualityLevels[0]);
  // console.log(currentQuality, "currentQuality");
  const handlePlayAndPause = useCallback(() => {
    if (togglePlayAndPause) {
      videoRef.current.play();
      setBuffering(false);
    } else {
      videoRef.current.pause();
    }
    setTogglePlayAndPause(!togglePlayAndPause);
  }, [togglePlayAndPause, videoRef]);


  //this is to check if the video is playing or not and set the buffering state accordingly
  useEffect(() => {
    const handlePlaying = () => {
      // console.log("Video is playing...");
      setBuffering(false);
    };

    videoRef?.current?.addEventListener('playing', handlePlaying);

    return () => {
      videoRef?.current?.removeEventListener('playing', handlePlaying);
    };
  }, []);
  // button component that stops propagation of the event
  const EventLessButton = ({ onClick, children, className }) => {
    return <button onClick={(event) => { onClick(); event.stopPropagation(); }} className={className}>{children}</button>
  }


  useEffect(() => {
    const loadVideo = async () => {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls();
        hls.loadSource(sourceLink);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          // videoRef.current.play();
          // setTogglePlayAndPause(false);
        });
        hlsRef.current = hls;
      }
    };

    loadVideo();
  }, [sourceLink]);




  useEffect(() => {

    let timer;
    if (controlsVisible) {
      timer = setTimeout(() => {
        setControlsVisible(false);
        // setSettingsVisible(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [controlsVisible]);

  // fetch(sourceLink)
  //   .then(response => response.text())
  //   .then(text => console.log(text))
  //   .catch(error => console.error(error));

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        updateProgress();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  // Helper function to format duration
  const formatDuration = (duration) => {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    let result = '';

    if (hours > 0) {
      result += `${hours}:`;
    }

    // Always add a colon after the minutes
    const formattedMinutes = minutes < 10 && hours > 0 ? `0${minutes}` : minutes;
    result += `${formattedMinutes}:`;

    // Always format the seconds
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    result += `${formattedSeconds}`;

    return result.trim();
  };

  const updateProgress = () => {
    const video = videoRef.current;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSettingsDropdown = () => {
    console.log("Settings dropdown");
    setSettingsVisible(!settingsVisible);
  };

  const changeQuality = (level) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
      setCurrentQuality(qualityLevels[level]); // Update the currentQuality state variable
    }
    // console.log(hlsRef.current.currentLevel, qualityLevels[level]);
  };

  const handlePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        if (videoRef.current.requestPictureInPicture) {
          await videoRef.current.requestPictureInPicture();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWaiting = () => {
    console.log("Video is waiting for data...");
    setBuffering(true);
  };
  const containerRef = useRef();


  const goFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      setFullscreen(true);
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => {
          if (screen.orientation) {
            screen.orientation.lock('landscape');
          }
        });
      } else if (containerRef.current.mozRequestFullScreen) { /* Firefox */
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { /* IE/Edge */
        containerRef.current.msRequestFullscreen();
      }
    } else {
      setFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          if (screen.orientation) {
            screen.orientation.unlock();
          }
        });
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }, [containerRef, setFullscreen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' || event.code === 'KeyK') {
        handlePlayAndPause();
      }
      if (event.code === 'KeyF') {
        goFullscreen();
      }
      if (event.code === 'KeyP' || event.code === 'KeyI') {
        handlePiP();
      }
      if (event.code === "Escape" || event.code === 'F11') {
        // setFullscreen(false);
        event.preventDefault();
      }
      if (event.code === 'ArrowRight') {
        videoRef.current.currentTime += 10;
        setSkipPlusTen(true);
        setTimeout(() => setSkipPlusTen(false), 1000);
      }
      if (event.code === 'ArrowLeft') {
        videoRef.current.currentTime -= 10;
        setSkipMinusTen(true);
        setTimeout(() => setSkipMinusTen(false), 1000);
      }
      if (event.code === 'ArrowUp') {
        if (videoRef.current.volume < 1) {
          videoRef.current.volume += 0.1;
        }
      }
      if (event.code === 'ArrowDown') {
        if (videoRef.current.volume > 0) {
          videoRef.current.volume -= 0.1;
        }
      }
      if (event.code === 'KeyM') {
        videoRef.current.muted = !videoRef.current.muted;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayAndPause, goFullscreen]);

  return (
    <>
      <div ref={containerRef} className="relative flex justify-center -mt-16"
        onMouseEnter={() => { setControlsVisible(true); console.log("visible") }}
        onMouseLeave={() => { setControlsVisible(false); console.log("invisible") }}
        onClick={() => { setControlsVisible(!controlsVisible); console.log("toggle") }}
      >
        <video ref={videoRef} className="" poster={thumbnail} onWaiting={handleWaiting}>
          Your browser does not support the video tag.
        </video>
        {/* top info-bar */}
        <div className={`controls bg-gradient-to-b from-black to-transparent top-0 ${controlsVisible ? "visible" : "invisible"}`}>
          <div className="flex flex-col">
            <p className='line-clamp-1 font-pro-bold font-bold'>{title}</p>
            <p className='line-clamp-1 text-xs font-pro-regular'>Ep: {episodeNumber}</p>
          </div>
          <div className='ms-auto flex items-center'>
            <EventLessButton>
              <IconText size={13} Icon={<MdClosedCaptionOff />} />
            </EventLessButton>
            <div className="relative bg-geen-500 flex justify-center flex-col items-center">
              <EventLessButton className='active:animate-spin' onClick={handleSettingsDropdown}>
                <IconText size={13} Icon={<IoSettingsOutline />} />
              </EventLessButton>
              <div className={`absolute top-full right-0 transition-all duration-150 z-50 bg-secondary ${settingsVisible ? 'scale-1' : 'scale-0'}`}>
                <div className='flex flex-col gap-y-1'>
                  <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                    {qualityLevels.map((quality, index) => (
                      <button
                        key={index}
                        onClick={() => changeQuality(index)}
                        className={`w-20 px-4 py-2 text-sm text-gray-700 hover:bg-secondary-foreground hover:text-gray-900 ${quality === currentQuality ? 'bg-secondary-foreground text-gray-900' : ''}`}
                        role='menuitem'
                      >
                        {quality}p
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* skip buttons */}
        <div className={`absolute right-0 top-10 w-1/2 h-4/5 rounded-full ${skipPlusTen ? 'animate-ping bg-red-500' : null}`}
          onDoubleClick={() => {
            videoRef && videoRef.current && (videoRef.current.currentTime += 10);
            setSkipPlusTen(true);
            setTimeout(() => setSkipPlusTen(false), 150);
          }}></div>
        <div className={`absolute left-0 top-10 w-1/2 h-4/5 rounded-full  ${skipMinusTen ? 'animate-ping bg-red-500' : null}`}
          onDoubleClick={() => {
            videoRef && videoRef.current && (videoRef.current.currentTime -= 10);
            setSkipMinusTen(true);
            setTimeout(() => setSkipMinusTen(false), 150);
          }}></div>

        <div className={`absolute top-1/2 px-4 aspect-square transition-all duration-300 inline-flex rounded-full bg-primary opacity-75 ${controlsVisible || togglePlayAndPause ? "visible" : "invisible"}`}>
          <EventLessButton onClick={handlePlayAndPause} >
            {buffering
              ? <IconText size={15} Icon={<ImSpinner8 className='animate-spin' />}/>
              : togglePlayAndPause
                ? <IconText size={15} Icon={<MdOutlinePlayArrow />} />
                : <IconText size={15} Icon={<MdOutlinePause />} />
            }
          </EventLessButton>
        </div>
        {/* bottom controls-bar */}
        <div className={`controls bg-gradient-to-t from-black to-transparent bottom-0 flex-col ${controlsVisible ? "visible" : "invisible"}`}>
          <div className='flex w-full'>
            <EventLessButton onClick={handlePlayAndPause} className="hidden md:block">
              {togglePlayAndPause
                ? <IconText size={15} Icon={<MdOutlinePlayArrow />} />
                : <IconText size={15} Icon={<MdOutlinePause />} />
              }
            </EventLessButton>
            <button
              className='text-xs bg-primary rounded-full px-2 py-1 w-16 font-pro-bold font-bold'
              onClick={() => { videoRef && videoRef.current && (videoRef.current.currentTime += 85) }}>+85s</button>
            <div className='ms-auto flex items-center'>
              <EventLessButton onClick={handlePiP}>
                {!fullscreen && <IconText size={13} Icon={<MdOutlinePictureInPictureAlt />} />}
              </EventLessButton>
              <EventLessButton onClick={goFullscreen}>
                {fullscreen
                  ? <IconText size={15} Icon={<MdOutlineFullscreenExit />} />
                  : <IconText size={15} Icon={<MdOutlineFullscreen />} />
                }
              </EventLessButton>
            </div>
          </div>
          <div className='flex items-start gap-y-1 md:items-center flex-col md:flex-row w-full justify-start'>
            <div className="text-xs font-semibold font-pro-medium px-4">
              <span className="">
                {formatDuration(moment.duration(videoRef?.current?.currentTime ?? 0, 'seconds'))}
              </span>
              /
              <span className="">
                {formatDuration(moment.duration(videoRef?.current?.duration ?? 0, 'seconds'))}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(event) => {
                const newProgress = event.target.value;
                setProgress(newProgress);
                videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
              }}
              className='w-full h-1 accent-primary mr-10'
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoPlayer;