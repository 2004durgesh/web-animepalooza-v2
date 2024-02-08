import fetchData from '@/components/Datafetcher'
import Trending from '@/components/TrendingAndPopular'
import Popular from '@/components/TrendingAndPopular'
import React from 'react'

const Anime = async () => {
  let trendingData=1
  setTimeout(async () => {
    console.log("Anime")
  }, 1000);
  trendingData =await fetchData("meta","anilist","trending");
  const popularData=await fetchData("meta","anilist","popular");

  return (
    <>
      <Trending headerText='Trending Anime' data={trendingData} />
      <Popular headerText='Popular Anime' data={popularData} />
    </>
  )
}

export default Anime