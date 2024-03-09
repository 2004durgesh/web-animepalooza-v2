"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const HeroSection = ({ animeSrc, mangaSrc, movieSrc }) => {
    const slides = [
        { src: animeSrc, type: 'image', heroText: 'Embark on an Epic Journey<br />through the World of Anime',width: 964, height: 480 },
        { src: mangaSrc, type: 'image', heroText: 'Unleash Your Imagination,<br />One Page at a Time', width: 4340, height: 2441 },
        { src: movieSrc, type: 'image', heroText: 'Streaming Asian Dramas and Global<br />Entertainment at Your Fingertips',width: 4340, height: 2441  },
    ];

    const heroTextStyle = 'absolute top-1/2 text-white text-2xl sm:text-4xl font-pro-bold font-bold pl-4';

    return (
        <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 10000,
                disableOnInteraction: true,
            }}
            pagination={{ dynamicBullets: true }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <Image src={slide.src} alt={slide.type} className='w-screen h-screen object-cover' width={slide.width} height={slide.height} />
                    <h1 className={heroTextStyle} dangerouslySetInnerHTML={{ __html: slide.heroText }}></h1>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default HeroSection