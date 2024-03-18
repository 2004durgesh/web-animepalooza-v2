import React from 'react'
import { redirect } from 'next/navigation'
import AllProvider from '@/constants/AllProvider'
import ContentList from '@/components/ContentList'
import fetchData from '@/components/Datafetcher'
const Provider = async ({ params }) => {
    const service = 'movies'
    const provider = params.provider
    console.log(params);
    console.log(params.provider)
    // console.log(AllProvider.includes(params.provider))
    const trending = await fetchData(service, params.provider, "trending");
    const recentMovies = await fetchData(service, params.provider, "recent-movies");
    const recentShows = await fetchData(service, params.provider, "recent-shows");
    return (
        <div>
            <ContentList headerText='Trending Movies and TV-Shows' data={trending} service={service} provider={params.provider} otherParams="trending"/>
            <ContentList headerText='Recent Movies' data={recentMovies} service={service} provider={params.provider} otherParams="recent-movies"/>
            <ContentList headerText='Recent TV-Shows' data={recentShows} service={service} provider={params.provider} otherParams="recent-shows"/>
        </div>
    )
}

export default Provider