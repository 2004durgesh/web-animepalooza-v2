import React from 'react'
import { redirect } from 'next/navigation'
import AllProvider from '@/constants/AllProvider'
import ContentList from '@/components/ContentList'
import fetchData from '@/components/Datafetcher'
const Provider = async ({ params }) => {
  console.log(params.provider[0])
  // console.log(AllProvider.includes(params.provider[0]))
  const trendingAnime = await fetchData("meta", "anilist", "trending",{page:1});
  const popularAnime = await fetchData("meta", "anilist", "popular",{page:1});
  return (
    <>
      {AllProvider.includes(params.provider) &&
        <div>
          <ContentList headerText='Trending Anime' data={trendingAnime} service="meta" provider="anilist" otherParams="trending"/>
          <ContentList headerText='Popular Anime' data={popularAnime} service="meta" provider="anilist" otherParams="popular"/>
        </div>
      }
    </>
  )
}

export default Provider