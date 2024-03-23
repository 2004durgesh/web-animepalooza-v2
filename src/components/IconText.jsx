"use client"
import React, { cloneElement } from 'react'
import { useMediaQuery } from 'react-responsive'

const IconText = ({ Icon, children }) => {
    console.log(children, Icon);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 768px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1025px)' });

    let iconSize;
    if (isSmallScreen) iconSize = 10;
    else if (isMediumScreen) iconSize = 15;
    else if (isLargeScreen) iconSize = 20;
    else if (isExtraLargeScreen) iconSize = 25;

    return (
        <span className='flex items-center text-xs sm:text-sm md:text-base lg:text-lg px-1'>
            {Icon && cloneElement(Icon, { size: iconSize })}
            {children}
        </span>
    );
};

export default IconText