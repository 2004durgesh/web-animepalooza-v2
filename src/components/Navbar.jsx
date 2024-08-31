"use client"
import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const pathname = usePathname()
  console.log(pathname)
  // State href manage the navigation menu open/close
  const [nav, setNav] = useState(false);

  // Array of navigation items
  const listItems = ['home', 'anime', 'manga', 'movies', 'favorites'];
  const showNavbarRoutes = ['/', '/anime', '/anime/gogoanime', '/manga', '/manga/mangadex', '/manga/mangareader', '/movies', '/movies/dramacool',
    '/movies/tmdb', '/movies/flixhq', '/favorites'];
  console.log((showNavbarRoutes.includes(pathname)) ? "true" : "false");
  return (
    <>
      {/* Navigation bar */}
      {(showNavbarRoutes.includes(pathname)) ? <nav className='flex items-center py-4 px-2 absolute top-0 w-4/5 z-20'>
        {/* Background overlay for mobile menu */}

        {pathname === '/' ? <Link href='/'>
          <h1 className='logo relative z-50 text-primary font-extrabold lg:text-5xl md:text-4xl text-3xl pointer-events-none tracking-wider select-none pl-2 mr-4'>
            AnimePalooza
          </h1>
        </Link> : null}

        {/* Desktop navigation menu */}
        <ul className='ml-auto space-x-1 md:space-x-4 hidden lg:flex'>
          {listItems.map((item) => (
            <li className='font-pro-bold font-semibold text-accent text-lg text-white capitalize pr-6 cursor-pointer' onClick={()=>console.error("clicked the link")} key={item}>
              {/* Next Link for navigation */}
              {<Link href={item !== 'home' ? `/${item}` : `/`} prefetch >{item}</Link>}
            </li>
          ))}
        </ul>

        {/* Mobile menu icon */}
        <div className='ml-auto block lg:hidden relative z-50'>
          {nav ?
            <Cross1Icon
              color='white'
              className='relative mt-4 h-8 w-8'
              onClick={() => setNav(prevValue => !prevValue)}
            /> :
            <HamburgerMenuIcon
               className='h-8 w-8'
              size={40}
              color='white'
              onClick={() => setNav(prevValue => !prevValue)}
            />}
        </div>

        {/* Mobile navigation menu */}
        <div className={nav ? `fixed inset-0 backdrop-filter backdrop-blur-md bg-opacity-40 z-[0]` : null}></div>
        <ul className={nav ? "fixed top-0 right-0 h-[50vh] w-72 mr-4 mt-4 bg-primary rounded-2xl space-y-4 px-6 py-14 m-4 md:hidden ease-in duration-200" : "fixed top-0 -right-full ease-out duration-200 "}>
          {listItems.map((item) => (
            <li className='font-semibold text-accent text-lg text-white font-pro-bold capitalize cursor-pointer' key={item}>
              {/* Next Link for navigation */}
              {<Link href={item !== 'home' ? `/${item}` : `/`} prefetch onClick={() => setNav(prevValue => !prevValue)}>{item}</Link>}
            </li>
          ))}
        </ul>
      </nav> : null}
    </>
  );
};

export default Navbar;
