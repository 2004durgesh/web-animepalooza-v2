"use client"
import React, { useState, useEffect } from 'react'
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

const FavoriteButton = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

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
    const favoriteIcon = isFavorite ? <HiHeart size={20} color="red" /> : <HiOutlineHeart size={20} color="white" />;
    const favoriteText = isFavorite ? "Added to Favorites" : "Add to Favorites";
    return (
        <button className="px-2" onClick={addToFavoritesHandler}>
            {favoriteIcon}
            {/* <span className="text-gray-200 md:text-gray-400 my-2 font-pro-medium">{favoriteText}</span> */}
        </button>
    )
}

export default FavoriteButton