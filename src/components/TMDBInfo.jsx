'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EpisodeCard from './EpisodeCard';

const TMDBInfo = ({ episodes, params, info }) => {
  const [seasonNumber, setSeasonNumber] = useState(0);
  if (params?.info_id[1] === 'movie') {
    return (
      <section>
        <EpisodeCard episodes={episodes} params={params} info={info} />
      </section>
    );
  }
  return (
    <section>
      <Tabs defaultValue='season-1'>
        <TabsList className='h-fit flex-wrap'>
          {episodes.map((season, seasonIndex) => (
            <TabsTrigger
              key={seasonIndex}
              value={`season-${seasonIndex + 1}`}
              onClick={() => {
                setSeasonNumber(seasonIndex);
                console.log('season', seasonNumber);
              }}
            >
              Season {season.season}
            </TabsTrigger>
          ))}
        </TabsList>
        {episodes &&
          episodes?.map((season, seasonIndex) => (
            <TabsContent key={seasonIndex} value={`season-${seasonIndex + 1}`}>
              <EpisodeCard
                episodes={season?.episodes}
                params={params}
                info={info}
                seasonNumber={seasonNumber}
              />
            </TabsContent>
          ))}
      </Tabs>
    </section>
  );
};

export default TMDBInfo;
