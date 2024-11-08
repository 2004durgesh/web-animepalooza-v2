'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Body = ({ children }) => {
  const pathname = usePathname();
  console.warn(pathname);

  return (
    <html lang='en'>
      <body
        className={`${!(pathname.includes('/watch/') || pathname.includes('/info/')) ? 'mx-auto max-w-[80%]' : ''} overflow-x-hidden`}
      >
        {children}
        <ProgressBar height='4px' color='#DB202C' options={{ showSpinner: false }} shallowRouting />
      </body>
    </html>
  );
};

export default Body;
