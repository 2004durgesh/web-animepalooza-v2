"use client";
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdOutlinePlayArrow, MdOutlinePause,MdOutlinePictureInPictureAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import IconText from './IconText';

const VideoPlayer = ({ links }) => {
  const videoRef = useRef();
  const hlsRef = useRef();
  const [togglePlayAndPause, setTogglePlayAndPause] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

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

  // fetch(links.sources[4].url)
  //     .then(response => response.text())
  //     .then(text => console.log(text))
  //     .catch(error => console.error(error));

  const changeQuality = (level) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
    console.log(hlsRef.current.currentLevel);
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
    <main>
      <div ref={containerRef} className="relative flex justify-center -mt-16">
        <video ref={videoRef} autoPlay className="">
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 right-0 bg-red-500 w-full flex items-center">
          <button onClick={handlePlayAndPause}>
            {togglePlayAndPause ? <IconText size={15} Icon={<MdOutlinePlayArrow />} /> :
              <IconText size={15} Icon={<MdOutlinePause />} />}
          </button>
          <div className='ms-auto'>
            <button>
              <IconText size={13} Icon={<MdOutlinePictureInPictureAlt />} />
            </button>
            <button>
              <IconText size={13} Icon={<IoSettingsOutline />} />
            </button>
            <button onClick={goFullscreen}>
              {fullscreen ? <IconText size={15} Icon={<MdOutlineFullscreenExit />} /> :
                <IconText size={15} Icon={<MdOutlineFullscreen />} />}
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 px-4 aspect-square active:animate-ping transition-all duration-300 inline-flex rounded-full bg-primary opacity-75">
          <button onClick={handlePlayAndPause}>
            {togglePlayAndPause ? <IconText size={15} Icon={<MdOutlinePlayArrow />} /> :
              <IconText size={15} Icon={<MdOutlinePause />} />}
          </button>
        </div>
      </div>
    </main>
  );
};

export default VideoPlayer;