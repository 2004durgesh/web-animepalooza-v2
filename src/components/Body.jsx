"use client"
import React from 'react'
import { usePathname } from 'next/navigation'

const Body = ({ children }) => {
    const pathname = usePathname()
    console.warn(pathname);
    return (
        <html lang="en">
            <body className={`${!pathname.includes("/watch/") ? "max-w-[80%] mx-auto" : ""} overflow-x-hidden`}>
                {children}
            </body>
        </html>
    )
}

export default Body