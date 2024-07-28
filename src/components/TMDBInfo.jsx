import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EpisodeCard from './EpisodeCard'

const TMDBInfo = ({ episodes, params,info}) => {
    return (
        <section>
            <Tabs defaultValue="season-1">
                <TabsList>
                    {
                        episodes.map((season, seasonIndex) => (
                            <TabsTrigger key={seasonIndex} value={`season-${seasonIndex + 1}`}>
                                Season {season.season}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    (episodes && episodes?.map((season, seasonIndex) => (
                        <TabsContent key={seasonIndex} value={`season-${seasonIndex + 1}`}>
                            <h2>Season {season.season}</h2>
                            <EpisodeCard episodes={season?.episodes} params={params} info={info}/>
                        </TabsContent>
                    )))
                }
            </Tabs>

        </section>
    )
}

export default TMDBInfo