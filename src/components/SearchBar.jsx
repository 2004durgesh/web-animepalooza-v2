"use client"
import React,{useState} from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname,useRouter } from 'next/navigation';
import { Button } from './ui/button';
const SearchBar = ({ placeholder,service}) => {

    const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname()
  const router=useRouter()
  console.log(pathname,"pathname");

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query as a URL parameter
    if (searchQuery === "") return
    else {
        router.push(`${pathname}/search/${searchQuery}`)
    }
  };
    return (
        <form onSubmit={handleSearch}>
            <div className="bg-black px-4 py-2 rounded-full flex items-center mx-2 md:mx-10 mb-10 mt-20 border-[2px] border-gray-400 font-pro-medium">
                <input
                    className="bg-transparent text-white outline-none placeholder-gray-400 flex-grow"
                    type="search"
                    placeholder='Search for anime,manga,movies and tv-shows'
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />
                <Button className="bg-transparent cursor-pointer border-none" onSubmit={handleSearch}>
                    <MagnifyingGlassIcon className='h-4 w-4' />
                </Button>
            </div>
        </form>
    )
}

export default SearchBar