// "use client"
import ContentList from "@/components/ContentList";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import fetchData from "@/components/Datafetcher";
export default async function Home() {
  const trendingAnime = await fetchData("meta", "anilist", "trending", { page: 1 });
  const popularAnime = await fetchData("meta", "anilist", "popular", { page: 1 });
  const recentAnime = await fetchData("meta", "anilist", "recent-episodes", { page: 1 });
  return (
    <>
      <div className="">
        <HeroSection animeSrc='/assets/images/anime-bg.png' mangaSrc='/assets/images/manga-bg.png' movieSrc='/assets/images/movies-bg.png' />
      </div>
      <div className="my-4">
        <Tabs defaultValue="trending-now">
          <TabsList>
            <TabsTrigger value="trending-now">Trending Now</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent-added">Recent Added</TabsTrigger>
          </TabsList>

          <TabsContent value="trending-now">
            <div className="">
              <ContentList headerText='Trending Anime' data={trendingAnime} services="meta" provider="anilist" otherParams="trending" params={{ services: "anime", provider: "gogoanime" }} />
            </div>
          </TabsContent>
          <TabsContent value="popular">
            <div className="">
              <ContentList headerText='Popular Anime' data={popularAnime} services="meta" provider="anilist" otherParams="popular" params={{ services: "anime", provider: "gogoanime" }} />
            </div>
          </TabsContent>
          <TabsContent value="recent-added">
            <div className="">
              <ContentList headerText='Recent Anime' data={recentAnime} services="meta" provider="anilist" otherParams="recent-episodes" params={{ services: "anime", provider: "gogoanime" }} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </>
  )
}
