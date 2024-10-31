'use client';
import React, { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import Image from 'next/image';

const HeroSection = ({ animeSrc, mangaSrc, movieSrc }) => {
  const slides = [
    {
      src: animeSrc,
      type: 'image',
      heroText: 'Embark on an Epic Journey<br />through the World of Anime',
      width: 964,
      height: 480,
    },
    {
      src: mangaSrc,
      type: 'image',
      heroText: 'Unleash Your Imagination,<br />One Page at a Time',
      width: 4340,
      height: 2441,
    },
    {
      src: movieSrc,
      type: 'image',
      heroText:
        'Streaming Asian Dramas and Global<br />Entertainment at Your Fingertips',
      width: 1920,
      height: 860,
    },
  ];

  const heroTextStyle =
    'absolute top-1/2 z-10 text-white text-center text-2xl sm:text-4xl font-pro-bold font-bold w-full ';
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className='relative'>
            <Image
              src={slide.src}
              alt={slide.type}
              className='h-[35rem] w-screen object-cover'
              width={slide.width}
              height={slide.height}
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 backdrop-blur-[0.5px]'></div>
            <h1
              className={heroTextStyle}
              dangerouslySetInnerHTML={{ __html: slide.heroText }}
            ></h1>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export default HeroSection;
