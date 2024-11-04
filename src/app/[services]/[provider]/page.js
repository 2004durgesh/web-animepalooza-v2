import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import AllProvider from '@/constants/AllProvider.json';
import ServiceProvider from '@/constants/ServiceProvider.json';
import ContentList from '@/components/ContentList';
import fetchData from '@/components/Datafetcher';
import SearchBar from '@/components/SearchBar';
import Loading from './loading';

const Provider = async ({ params }) => {
  if (!AllProvider.includes(params.provider)) {
    return notFound();
  }

  const services =
    params.services === 'anime' || params.services === 'manga' || params.provider === 'tmdb'
      ? 'meta'
      : params.services;

  const provider =
    params.services === 'anime'
      ? 'anilist'
      : params.services === 'manga'
        ? 'anilist-manga'
        : params.provider;

  try {
    const [trending, popular, recentEpisodes, recentMovies, recentShows] = await Promise.all([
      fetchData(services, provider, 'trending', { page: 1 }),
      fetchData(services, provider, 'popular', { page: 1 }),
      fetchData(services, provider, 'recent-episodes', { page: 1 }),
      fetchData(services, provider, 'recent-movies'),
      fetchData(services, provider, 'recent-shows'),
    ]);

    const renderContentList = (headerText, data, otherParams) => (
      <Suspense fallback={<Loading />}>
        <ContentList
          params={params}
          headerText={headerText}
          data={data}
          services={services}
          provider={provider}
          otherParams={otherParams}
        />
      </Suspense>
    );

    return (
      <>
        <SearchBar services={params.services} />
        <div>
          {ServiceProvider.map((service) => {
            if (service.name.toLowerCase() === params.provider) {
              return (
                <React.Fragment key={service.service}>
                  {service.trending &&
                    renderContentList(
                      `Trending ${params.services === 'anime' ? 'Anime' : params.services === 'manga' ? 'Manga' : 'Movies and TV-Shows'}`,
                      trending,
                      'trending'
                    )}
                  {service.popular &&
                    renderContentList(
                      `Popular ${params.services === 'anime' ? 'Anime' : params.services === 'manga' ? 'Manga' : 'Movies and TV-Shows'}`,
                      popular,
                      'popular'
                    )}
                  {service.recent &&
                    services === 'meta' &&
                    renderContentList('Recent Anime Episodes', recentEpisodes, 'recent-episodes')}
                  {service.recent && services === 'movies' && (
                    <>
                      {renderContentList('Recent Movies', recentMovies, 'recent-movies')}
                      {renderContentList('Recent TV-Shows', recentShows, 'recent-shows')}
                    </>
                  )}
                </React.Fragment>
              );
            }
          })}
        </div>
      </>
    );
  } catch (error) {
    console.error('Data fetching error:', error);
    return <p>Failed to load content. Please try again later.</p>;
  }
};

export default Provider;
