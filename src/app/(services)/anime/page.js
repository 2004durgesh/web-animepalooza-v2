import fetchData from '@/components/Datafetcher'
import ContentList from '@/components/ContentList'
import React from 'react'
import ProviderList from '@/components/ProviderList';
import ServiceProvider from '@/constants/ServiceProvider';

const Anime = () => {
  // const trendingAnime = await fetchData("meta", "anilist", "trending");
  // const popularAnime = await fetchData("meta", "anilist", "popular");

  return (
    <>
      {/* <ContentList headerText='Trending Anime' data={trendingAnime} service="meta" provider="anilist" otherParams="trending" contentType="anime" />
      <ContentList headerText='Popular Anime' data={popularAnime} service="meta" provider="anilist" otherParams="popular" contentType="anime" /> */}
      <h1 className="text-3xl font-bold mb-8">Explore Providers</h1>
      {ServiceProvider.map((provider) => {
        return provider.service==='anime'&&<ProviderList
          key={provider.name}
          service={provider.service}
          name={provider.name}
          description={provider.description}
          imgSrc={provider.logo} 
          slug={provider.slug}
          />

      })}


    </>
  )
}

export default Anime