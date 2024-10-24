import React, { Suspense } from 'react'
import ProviderList from '@/components/ProviderList';
import ServiceProvider from '@/constants/ServiceProvider.json';
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from 'next/navigation'
import Favorite from './favorite'
const page = ({ params }) => {

  
  const matchingProviders = ServiceProvider.filter(provider => provider.service === params.services)
  if (matchingProviders.length === 0 && params.services !== 'favorites') {
    notFound()
  }
  if(params.services === 'favorites'){
    return (
      <Favorite/>
    )
  }
  return (
      <div>
        {params.services !== 'favorites'&&<h1 className="text-3xl font-bold mb-8">Explore Providers</h1>}
        {ServiceProvider.map((provider) => {
          if (provider.service === params.services) {
            return <ProviderList
              key={provider.name}
              service={provider.service}
              name={provider.name}
              description={provider.description}
              imgSrc={provider.logo}
              slug={provider.slug}
            />
          }
        })}
      </div>

  )
}

export default page