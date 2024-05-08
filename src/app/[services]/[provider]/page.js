import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import AllProvider from '../../../constants/AllProvider.json'
import ContentList from '../../../components/ContentList'
import fetchData from '../../../components/Datafetcher'
import SearchBar from '../../../components/SearchBar'
import Loading from './loading'
const Provider = async ({ params }) => {
    console.log(params.provider)
    // console.log(AllProvider.includes(params.provider[0]))
    let services = params.services === 'anime' || params.services === 'manga' || params.provider === "tmdb" ? 'meta' : params.services;
    let provider = params.services === 'anime' ? "anilist" : params.services === 'manga' ? "anilist-manga" : params.provider;
    const trending = await fetchData(services, provider, "trending", { page: 1 });
    const popular = await fetchData(services, provider, "popular", { page: 1 });
    const recent = await fetchData(services, provider, "recent", { page: 1 });
    const recentMovies = await fetchData(services, provider, "recent-movies");
    const recentShows = await fetchData(services, provider, "recent-shows");
    if(!AllProvider.includes(params.provider))  notFound()
    return (
        <>
            {AllProvider.includes(params.provider) &&
                <>
                    <SearchBar services={params.services} />
                    <div>
                        <Suspense fallback={<Loading />}>
                            <ContentList params={params} headerText={params.services === 'anime' ? 'Trending Anime' : params.services === 'manga' ? 'Trending Manga' : "Trending Movies and TV-Shows"} data={trending} services={services} provider={provider} otherParams="trending" />
                        </Suspense>

                        {params.services !== 'movies' &&
                            <Suspense fallback={<Loading />}>
                                <ContentList params={params} headerText={params.services === 'anime' ? 'Popular Anime' : "Popular Manga"} data={popular} services={services} provider={provider} otherParams="popular" />
                            </Suspense>
                        }


                        {params.services === 'movies' && <>
                            <Suspense fallback={<Loading />}>
                                <ContentList params={params} headerText='Recent Movies' data={recentMovies} services={services} provider={provider} otherParams="recent-movies" />
                                <ContentList params={params} headerText='Recent TV-Shows' data={recentShows} services={services} provider={provider} otherParams="recent-shows" />
                            </Suspense>
                        </>}
                    </div>
                </>

            }
        </>
    )
}

export default Provider