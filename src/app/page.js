// "use client"
import Download from "@/components/Download";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  
  return (
    <>
      <div className="">
        <div className='relative'>
          <HeroSection animeSrc='/assets/images/anime-bg.png' mangaSrc='/assets/images/manga-bg.png' movieSrc='/assets/videos/movies-bg.mp4' />
          <div className="absolute z-10 pointer-events-none inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
        </div>
      </div>
      {/* <Download/> */}
    </>
  )
}
