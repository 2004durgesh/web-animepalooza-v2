import React,{Suspense} from 'react'
import fetchData from '@/components/Datafetcher'
import ContentList from '@/components/ContentList';
const page = async({ params }) => {
    let services = params.services === 'anime' || params.services === 'manga' ? 'meta' : params.services;
    let provider = params.services === 'anime' || params.services === 'manga' ? "anilist" : params.provider;
    // const animeAndMangaSearchResults 
    // // const moviesSearchResults = fetchData(services, provider, '${params.search_query}');
    const searchResults =await fetchData(services, provider, `${params.search_query}`);
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {/* {JSON.stringify(animeAndMangaSearchResults)} */}
            <ContentList params={params} headerText={`Search Results for ${decodeURIComponent(params.search_query)}`} data={searchResults} service={services} provider={provider} otherParams="trending" />

        </Suspense>
    )
}

export default page