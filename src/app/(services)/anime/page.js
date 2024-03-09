import fetchData from '@/components/Datafetcher'
import ContentList from '@/components/ContentList'
import React from 'react'

const Anime = async () => {
  const trendingAnime = await fetchData("meta","anilist","trending");
  const popularAnime = await fetchData("meta","anilist","popular");

  return (
    <>
      <ContentList headerText='Trending Anime' data={trendingAnime} contentType="anime" />
      <ContentList headerText='Popular Anime' data={popularAnime} contentType="anime" />
    </>
  )
}

export default Anime