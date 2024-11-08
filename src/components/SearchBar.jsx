'use client';
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const SearchBar = ({ placeholder, service }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname, 'pathname');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query as a URL parameter
    if (searchQuery === '') return;
    else {
      router.push(`${pathname}/search/${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className='mx-2 mb-10 mt-20 flex items-center rounded-full border-[2px] border-gray-400 bg-black px-4 py-2 font-pro-medium md:mx-10'>
        <input
          className='flex-grow bg-transparent text-white placeholder-gray-400 outline-none'
          type='search'
          placeholder='Search for anime, manga, movies, and tv-shows'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Button type='submit' variant='ghost' className='cursor-pointer border-none bg-transparent'>
          <MagnifyingGlassIcon className='h-8 w-8' />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
