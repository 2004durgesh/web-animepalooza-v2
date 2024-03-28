"use client"
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ links }) => {
    const videoRef = useRef();
    const hlsRef = useRef();
    useEffect(() => {
        const loadVideo = async () => {
            if (Hls.isSupported() && videoRef.current) {
                const hls = new Hls();
                hls.loadSource(links.sources[4].url);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    videoRef.current.play();
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
          if (containerRef.current.requestFullscreen) {
            containerRef.current.requestFullscreen();
          } else if (containerRef.current.mozRequestFullScreen) { /* Firefox */
            containerRef.current.mozRequestFullScreen();
          } else if (containerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            containerRef.current.webkitRequestFullscreen();
          } else if (containerRef.current.msRequestFullscreen) { /* IE/Edge */
            containerRef.current.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
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
            <div ref={containerRef} className="relative">
                {/* <video ref={videoRef} className="w-full aspect-video">
                    Your browser does not support the video tag.
                </video> */}
                <div className="absolute bottom-0 left-0 flex space-x-4 p-4">
                    <button onClick={goFullscreen}>Go Fullscreen</button>
                    <button onClick={() => changeQuality(0)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">360</button>
                    <button onClick={() => changeQuality(1)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">480</button>
                    <button onClick={() => changeQuality(2)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">720</button>
                    <button onClick={() => changeQuality(3)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">1080</button>
                </div>
            </div>
        </main>
    );
};

export default VideoPlayer;