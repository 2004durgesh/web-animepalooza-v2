"use client"
import ContentList from '@/components/ContentList';
import React from 'react'

const favorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return (
        <div>
            {/* <Suspense fallback={<Loading />}>
                            <ContentList 
                            params={params} 
                            headerText={params.services === 'anime' ? 'Trending Anime' : params.services === 'manga' ? 'Trending Manga' : "Trending Movies and TV-Shows"}    
                            data={trending} 
                            services={services} 
                            provider={provider}                                 
                            otherParams="trending" />
                        </Suspense> */}
            <ContentList data={favorites} services="favorites"/>
        </div>
    )
}

export default favorite