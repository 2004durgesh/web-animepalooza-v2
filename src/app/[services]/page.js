import fetchData from '@/components/Datafetcher'
import ContentList from '@/components/ContentList'
import React,{Suspense} from 'react'
import ProviderList from '@/components/ProviderList';
import ServiceProvider from '@/constants/ServiceProvider';

const page = ({params}) => {
  

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <h1 className="text-3xl font-bold mb-8">Explore Providers</h1>
      {ServiceProvider.map((provider) => {
        return provider.service===params.services&&<ProviderList
          key={provider.name}
          service={provider.service}
          name={provider.name}
          description={provider.description}
          imgSrc={provider.logo} 
          slug={provider.slug}
          />

      })}


    </Suspense>
  )
}

export default page