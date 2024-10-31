'use client';
import React, { useState, useEffect } from 'react';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

const FavoriteButton = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const storedFavorites = localStorage.getItem('favorites');
  const [favorites, setFavorites] = useState(
    storedFavorites ? JSON.parse(storedFavorites) : []
  );

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.id === item.id));
  }, [item.id, favorites]);

  const addToFavoritesHandler = () => {
    if (isFavorite) {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== item.id
      );
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };
  const favoriteIcon = isFavorite ? (
    <HeartFilledIcon size={20} color='white' />
  ) : (
    <HeartIcon size={20} color='white' />
  );
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            className='relative'
            onClick={addToFavoritesHandler}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <motion.div
              initial={false}
              animate={{ scale: isFavorite ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {favoriteIcon}
            </motion.div>
            <AnimatePresence>
              {isFavorite && (
                <motion.span
                  key='ping'
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='absolute inset-0 rounded-full'
                ></motion.span>
              )}
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent className='bg-secondary'>
          <p>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavoriteButton;
