import React from 'react'
import { redirect } from 'next/navigation'
import AllProvider from '@/constants/AllProvider'
import ContentList from '@/components/ContentList'
import fetchData from '@/components/Datafetcher'
const Provider = async ({ params }) => {
  console.log(params.provider[0])
  // console.log(AllProvider.includes(params.provider[0]))
  const trendingAnime = await fetchData("meta", "anilist", "trending");
  const popularAnime = await fetchData("meta", "anilist", "popular");
  return (
    <div>
      <ContentList headerText='Trending Anime' data={trendingAnime} service="meta" provider="anilist" otherParams="trending" contentType="anime" />
      <ContentList headerText='Popular Anime' data={popularAnime} service="meta" provider="anilist" otherParams="popular" contentType="anime" />
    </div>
  )
}

export default Provider