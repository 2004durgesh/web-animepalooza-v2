import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import AllProvider from '@/constants/AllProvider'
import ContentList from '@/components/ContentList'
import fetchData from '@/components/Datafetcher'
import SearchBar from '@/components/SearchBar'
import Loading from './loading'
const Provider = async ({ params }) => {
    console.log(params.provider)
    // console.log(AllProvider.includes(params.provider[0]))
    let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
    let provider = params.services === 'anime' ? "anilist" : params.services === 'manga' ? "anilist-manga" : params.provider;
    const trending = await fetchData(services, provider, "trending", { page: 1 });
    const popular = await fetchData(services, provider, "popular", { page: 1 });
    const recent = await fetchData(services, provider, "recent", { page: 1 });
    const recentMovies = await fetchData(services, provider, "recent-movies");
    const recentShows = await fetchData(services, provider, "recent-shows");
    return (
        <>
            {AllProvider.includes(params.provider) &&
                <>
                    <SearchBar service={params.service} />
                    <div>
                        <Suspense fallback={<Loading />}>
                            <ContentList params={params} headerText={params.services === 'anime' ? 'Trending Anime' : params.services === 'manga' ? 'Trending Manga' : "Trending Movies and TV-Shows"} data={trending} service={services} provider={provider} otherParams="trending" />
                        </Suspense>

                        {params.services !== 'movies' &&
                            <Suspense fallback={<Loading />}>
                                <ContentList params={params} headerText={params.services === 'anime' ? 'Popular Anime' : "Popular Manga"} data={popular} service={services} provider={provider} otherParams="popular" />
                            </Suspense>
                        }


                        {params.services === 'movies' && <>
                            <Suspense fallback={<Loading />}>
                                <ContentList params={params} headerText='Recent Movies' data={recentMovies} service={services} provider={provider} otherParams="recent-movies" />
                                <ContentList params={params} headerText='Recent TV-Shows' data={recentShows} service={services} provider={provider} otherParams="recent-shows" />
                            </Suspense>
                        </>}
                    </div>
                </>

            }
        </>
    )
}

export default Provider