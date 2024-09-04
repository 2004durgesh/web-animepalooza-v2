import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EpisodeCard from './EpisodeCard'

const TMDBInfo = ({ episodes, params, info }) => {
    if (params?.info_id[1]==="movie") {
        
        return <section>
            <EpisodeCard episodes={episodes} params={params} info={info} />
        </section>
    }
    return (
        <section>
            <Tabs defaultValue="season-1">
                <TabsList className="flex-wrap h-fit">
                    {
                        episodes.map((season, seasonIndex) => (
                            <TabsTrigger key={seasonIndex} value={`season-${seasonIndex + 1}`} >
                                Season {season.season}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    (episodes && episodes?.map((season, seasonIndex) => (
                        <TabsContent key={seasonIndex} value={`season-${seasonIndex + 1}`}>
                            <EpisodeCard episodes={season?.episodes} params={params} info={info} />
                        </TabsContent>
                    )))
                }
            </Tabs>

        </section>
    )
}

export default TMDBInfo