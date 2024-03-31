"use client";
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdOutlinePlayArrow, MdOutlinePause, MdOutlinePictureInPictureAlt, MdClosedCaptionOff } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import IconText from './IconText';
import moment from 'moment';

const VideoPlayer = ({ links }) => {
  const videoRef = useRef();
  const hlsRef = useRef();
  const [togglePlayAndPause, setTogglePlayAndPause] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const handlePlayAndPause = () => {
    if (togglePlayAndPause) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setTogglePlayAndPause(!togglePlayAndPause);
  }



  useEffect(() => {
    const loadVideo = async () => {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls();
        hls.loadSource(links.sources[4].url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current.play();
          setTogglePlayAndPause(false);
        });
        hlsRef.current = hls;
      }
    };

    loadVideo();
  }, [links]);


  useEffect(() => {

    let timer;
    if (controlsVisible) {
      timer = setTimeout(() => {
        setControlsVisible(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [controlsVisible]);

  // fetch(links.sources[4].url)
  //     .then(response => response.text())
  //     .then(text => console.log(text))
  //     .catch(error => console.error(error));

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

  const changeQuality = (level) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
    console.log(hlsRef.current.currentLevel);
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
  const containerRef = useRef();


  const goFullscreen = () => {
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
  };

  return (
    <>
      <div ref={containerRef} className="relative flex justify-center -mt-16"
        onMouseEnter={() => { setControlsVisible(true); console.log("visible") }}
        onMouseLeave={() => { setControlsVisible(false); console.log("invisible") }}
        onClick={() => { setControlsVisible(!controlsVisible); console.log("toggle") }}
      >
        <video ref={videoRef} autoPlay className="">
          Your browser does not support the video tag.
        </video>
        {/* top info-bar */}
        <div className='absolute top-0 left-0 bg-red-500 w-full flex items-center'>
          <p className='line-clamp-1'>Title of the episode or movie/tv-shows</p>
          <div className='ms-auto flex items-center'>
            <button>
              <IconText size={13} Icon={<MdClosedCaptionOff />} />
            </button>
            <button>
              <IconText size={13} Icon={<IoSettingsOutline />} />
            </button>
          </div>
        </div>
        <div className='absolute right-0 top-10 w-1/2 h-4/5 '
          onDoubleClick={() => { videoRef && videoRef.current && (videoRef.current.currentTime += 10) }}></div>
        <div className='absolute left-0 top-10 w-1/2 h-4/5 '
          onDoubleClick={() => { videoRef && videoRef.current && (videoRef.current.currentTime -= 10) }}></div>

        <div className={`absolute top-1/2 px-4 aspect-square transition-all duration-300 inline-flex rounded-full bg-primary opacity-75 ${togglePlayAndPause ? "visible" : "invisible"}`}>
          <button onClick={handlePlayAndPause}>
            {togglePlayAndPause ? <IconText size={15} Icon={<MdOutlinePlayArrow />} /> :
              <IconText size={15} Icon={<MdOutlinePause />} />}
          </button>
        </div>
        {/* bottom controls-bar */}
        <div className={`controls absolute bottom-0 right-0 w-full flex flex-col items-center ${controlsVisible ? "visible" : "invisible"}`}>
          <div className='flex w-full'>
            <button onClick={handlePlayAndPause}>
              {togglePlayAndPause
                ? <IconText size={15} Icon={<MdOutlinePlayArrow />} />
                : <IconText size={15} Icon={<MdOutlinePause />} />
              }
            </button>
            <button
              className='text-xs bg-primary rounded-full px-2 py-1 w-16'
              onClick={() => { videoRef && videoRef.current && (videoRef.current.currentTime += 85) }}>+85s</button>
            <div className='ms-auto flex items-center'>
              <button onClick={handlePiP}>
                {!fullscreen&&<IconText size={13} Icon={<MdOutlinePictureInPictureAlt />} />}
              </button>
              <button onClick={goFullscreen}>
                {fullscreen
                  ? <IconText size={15} Icon={<MdOutlineFullscreenExit />} />
                  : <IconText size={15} Icon={<MdOutlineFullscreen />} />
                }
              </button>
            </div>
          </div>
          <div className='flex items-start gap-y-1 md:items-center flex-col md:flex-row w-full justify-start'>
            <div className="text-xs px-4">
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