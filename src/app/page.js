// "use client"
import ContentList from "@/components/ContentList";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import fetchData from "@/components/Datafetcher";
export default async  function Home() {
  const trendingAnime = await fetchData("meta","anilist","trending");
  const popularAnime = await fetchData("meta","anilist","popular");
  const recentAnime = await fetchData("meta","anilist","recent-episodes");
  return (
    <>
      <div className="">
        <div className='relative'>
          <HeroSection animeSrc='/assets/images/anime-bg.png' mangaSrc='/assets/images/manga-bg.png' movieSrc='/assets/images/movies-bg.png' />
          <div className="absolute z-10 pointer-events-none inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
        </div>
      </div>
      <div className="my-4">
        <Tabs defaultValue="trending-now" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="trending-now">Trending Now</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent-added">Recent Added</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending-now">
          <div className="w-screen">
            <ContentList headerText='Trending Anime' data={trendingAnime} service="meta" provider="anilist" otherParams="trending" contentType="anime" />
          </div>
          </TabsContent>
          <TabsContent value="popular">
          <div className="w-screen">
            <ContentList headerText='Popular Anime' data={popularAnime} service="meta" provider="anilist" otherParams="popular" contentType="anime" />
          </div>
          </TabsContent>
          <TabsContent value="recent-added">
          <div className="w-screen">
            <ContentList headerText='Recent Anime' data={recentAnime} service="meta" provider="anilist" otherParams="recent-episodes" contentType="anime" />
          </div>
          </TabsContent>
        </Tabs>
      </div>

    </>
  )
}
