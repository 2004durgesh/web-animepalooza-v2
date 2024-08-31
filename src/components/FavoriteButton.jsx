"use client"
import React, { useState, useEffect } from 'react'
import { HeartFilledIcon,HeartIcon } from '@radix-ui/react-icons'

const FavoriteButton = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const storedFavorites = localStorage.getItem('favorites');
    const [favorites, setFavorites] = useState(storedFavorites ? JSON.parse(storedFavorites) : []);

    useEffect(() => {
        setIsFavorite(favorites.some(favorite => favorite.id === item.id));
    }, [item.id, favorites]);

    const addToFavoritesHandler = () => {
        if (isFavorite) {
            const newFavorites = favorites.filter(favorite => favorite.id !== item.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } else {
            const newFavorites = [...favorites, item];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        }
    };
    const favoriteIcon = isFavorite ? <HeartFilledIcon size={20} color="red" /> : <HeartIcon size={20} color="black" />;
    return (
        <button className="px-2" onClick={addToFavoritesHandler}>
            <span className='px-2 aspect-square transition-all hover:scale-90 active:animate-ping duration-300 inline-flex items-center rounded-full bg-primary-foreground'>{favoriteIcon}</span>
        </button>
    )
}

export default FavoriteButton