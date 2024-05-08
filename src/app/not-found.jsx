"use client"
import React from 'react'
import Link from 'next/link'
import Lottie from "lottie-react";
import Error404 from "../../public/assets/lottie/404-error.json";
const NotFound = () => {
    return (
        <>
            <div className='flex justify-center items-center w-screen h-[50vh] relative'>
                <div className=''>
                    <Lottie animationData={Error404} loop={true} />
                </div>
                <Link href="/" className='absolute text-black font-pro-bold text-4xl '>Return Home</Link>
            </div>
        </>
    )
}

export default NotFound