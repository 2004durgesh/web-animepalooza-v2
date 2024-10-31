'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

const Body = ({ children }) => {
  const pathname = usePathname();
  console.warn(pathname);
  return (
    <html lang='en'>
      <body
        className={`${!(pathname.includes('/watch/') || pathname.includes('/info/')) ? 'mx-auto max-w-[80%]' : ''} overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
};

export default Body;
