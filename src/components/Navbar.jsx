'use client';
import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname();
  // console.log(pathname)
  // State href manage the navigation menu open/close
  const [nav, setNav] = useState(false);

  // Array of navigation items
  const listItems = ['home', 'anime', 'manga', 'movies', 'favorites'];
  const showNavbarRoutes = [
    '/',
    '/anime',
    '/anime/gogoanime',
    '/manga',
    '/manga/mangadex',
    '/manga/mangareader',
    '/movies',
    '/movies/dramacool',
    '/movies/tmdb',
    '/movies/flixhq',
    '/favorites',
  ];
  console.log(showNavbarRoutes.includes(pathname) ? 'true' : 'false');
  return (
    <>
      {/* Navigation bar */}
      {showNavbarRoutes.includes(pathname) ? (
        <nav className='fixed top-0 z-20 flex w-4/5 items-center bg-background/80 p-2 backdrop-blur-sm'>
          {/* Background overlay for mobile menu */}

          {pathname === '/' ? (
            <Link href='/'>
              <h1 className='logo pointer-events-none relative z-50 mr-4 select-none pl-2 text-3xl font-extrabold tracking-wider text-primary md:text-4xl lg:text-5xl'>
                AnimePalooza
              </h1>
            </Link>
          ) : null}

          {/* Desktop navigation menu */}
          <ul className='ml-auto hidden space-x-1 md:space-x-4 lg:flex'>
            {listItems.map((item) => (
              <li
                className='cursor-pointer pr-6 font-pro-bold text-lg font-semibold capitalize text-accent text-white'
                onClick={() => console.error('clicked the link')}
                key={item}
              >
                {/* Next Link for navigation */}
                {
                  <Link href={item !== 'home' ? `/${item}` : `/`} prefetch>
                    {item}
                  </Link>
                }
              </li>
            ))}
          </ul>

          {/* Mobile menu icon */}
          <div className='relative z-50 ml-auto block lg:hidden'>
            {nav ? (
              <Cross1Icon
                color='white'
                className='relative mt-4 h-8 w-8'
                onClick={() => setNav((prevValue) => !prevValue)}
              />
            ) : (
              <HamburgerMenuIcon
                className='h-8 w-8'
                size={40}
                color='white'
                onClick={() => setNav((prevValue) => !prevValue)}
              />
            )}
          </div>

          {/* Mobile navigation menu */}
          <div
            className={
              nav ? `fixed inset-0 z-[0] bg-opacity-40 backdrop-blur-md backdrop-filter` : null
            }
          ></div>
          <ul
            className={
              nav
                ? 'fixed right-0 top-0 m-4 mr-4 mt-4 h-[50vh] w-72 space-y-4 rounded-2xl bg-primary px-6 py-14 duration-200 ease-in md:hidden'
                : 'fixed -right-full top-0 duration-200 ease-out'
            }
          >
            {listItems.map((item) => (
              <li
                className='cursor-pointer font-pro-bold text-lg font-semibold capitalize text-accent text-white'
                key={item}
              >
                {/* Next Link for navigation */}
                {
                  <Link
                    href={item !== 'home' ? `/${item}` : `/`}
                    prefetch
                    onClick={() => setNav((prevValue) => !prevValue)}
                  >
                    {item}
                  </Link>
                }
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default Navbar;
