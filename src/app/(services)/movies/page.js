import React from 'react'
import ProviderList from '@/components/ProviderList';
import ServiceProvider from '@/constants/ServiceProvider';

const Movies = () => {

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Explore Providers</h1>
      {ServiceProvider.map((provider) => {
        return provider.service === 'movies' && <ProviderList
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

export default Movies