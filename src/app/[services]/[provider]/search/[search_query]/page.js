import React, { Suspense } from 'react';
import fetchData from '@/components/Datafetcher';
import ContentList from '@/components/ContentList';

const page = async ({ params }) => {
  let services =
    params.services === 'anime' ||
    params.services === 'manga' ||
    params.provider === 'tmdb'
      ? 'meta'
      : params.services;

  let provider =
    params.services === 'anime'
      ? 'anilist'
      : params.services === 'manga'
        ? 'anilist-manga'
        : params.provider;

  // const animeAndMangaSearchResults
  // // const moviesSearchResults = fetchData(services, provider, '${params.search_query}');
  const searchResults = await fetchData(
    services,
    provider,
    `${params.search_query}`
  );

  return (
    <Suspense fallback={<h1>Loading search results...</h1>}>
      {/* {JSON.stringify(animeAndMangaSearchResults)} */}
      <ContentList
        params={params}
        headerText={`Search Results for ${decodeURIComponent(params.search_query)}`}
        data={searchResults}
        services={services}
        provider={provider}
        otherParams='trending'
        displayStyle='grid'
      />
    </Suspense>
  );
};

export default page;
