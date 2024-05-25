import React, { Suspense } from 'react'
import ProviderList from '@/components/ProviderList';
import ServiceProvider from '@/constants/ServiceProvider.json';
import { Skeleton } from "@/components/ui/skeleton"
import { notFound } from 'next/navigation'
const page = ({ params }) => {

  const LoaderUi = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 animate-pulse">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex-1 space-y-3 py-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  )
  const matchingProviders = ServiceProvider.filter(provider => provider.service === params.services)
  if (matchingProviders.length === 0 && params.services !== 'favorites') {
    notFound()
  }
  return (
    <Suspense fallback={<LoaderUi />}>
      <h1 className="text-3xl font-bold mb-8">Explore Providers</h1>
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
      {/* <LoaderUi/> */}

    </Suspense>
  )
}

export default page