"use client"
import React, { cloneElement } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Badge } from '@/components/ui/badge';


const IconText = ({ Icon, children,size=0 }) => {
    // console.log(children, Icon);
    // const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
    // const isMediumScreen = useMediaQuery({ query: '(min-width: 641px) and (max-width: 768px)' });
    // const isLargeScreen = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    // const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1025px)' });

    // let iconSize=20+size;
    // if (isSmallScreen) iconSize = 10+size;
    // else if (isMediumScreen) iconSize = 15+size;
    // else if (isLargeScreen) iconSize = 20+size;
    // else if (isExtraLargeScreen) iconSize = 25+size;

    return (
        <Badge variant="destructive" className='font-bold text-md'>
            {Icon && cloneElement(Icon)}
            {children}
        </Badge>
    );
};

export default IconText