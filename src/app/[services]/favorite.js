"use client"
import ContentList from '@/components/ContentList';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react'
import Loading from './[provider]/loading';

const Favorite = () => {
    const storedFavorites = localStorage.getItem('favorites');
    const [favorites, setFavorites] = useState(storedFavorites ? JSON.parse(storedFavorites) : []);
    const handleClearFavorites = () => {
        localStorage.setItem('favorites', JSON.stringify([]));
        setFavorites([]);
    }
    return (
        <div>
            {favorites.length>0&&<ContentList headerText="Your Favorites" data={favorites} services="favorites" displayStyle="grid" />}
            {favorites.length === 0 && <div className="text-center text-white font-bold flex flex-col justify-center gap-4">
                <span className="text-4xl md:text-6xl lg:text-7xl">{'.·´¯`(>__<)´¯`·.'}</span>
                <span className="md:text-xl lg:text-2xl">No favorites found</span>
            </div>}
            {favorites.length > 0 && <Button variant="destructive" onClick={handleClearFavorites}>Clear favorites</Button>}
            {/* <Loading/> */}
        </div>
    )
}

export default Favorite