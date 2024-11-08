'use client';

import React, { useEffect, useState } from 'react';
import fetchData from '@/components/Datafetcher';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import parse from 'html-react-parser';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const info_id = searchParams.get('info_id');

  const [voiceActor, setVoiceActor] = useState([]);
  const [character, setCharacter] = useState({});

  const fetchInfo = async () => {
    const info = await fetchData('meta', 'anilist', `data/${info_id}`, {
      provider: params.provider,
    });

    const characterData = await fetchData('meta', 'anilist', `character/${params.character_id}`);

    info?.characters.forEach((item) => {
      if (item.id === params.character_id) {
        setVoiceActor(item.voiceActors);
      }
    });

    setCharacter(characterData);
    return characterData;
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='p-4'>
      <div className='flex flex-col items-start space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
        {character?.image && (
          <Image
            unoptimized
            src={character.image}
            alt={character.name?.userPreferred}
            width={197}
            height={296}
            className='h-72 w-full rounded-lg object-cover shadow-lg md:w-48'
            priority
          />
        )}

        <div className='w-full'>
          <h1 className='font-pro-bold text-2xl font-bold text-primary'>
            {character.name?.userPreferred} / {character.name?.native}
          </h1>
          <p className='mt-2 font-pro-regular'>{parse(String(character.description))}</p>

          <div className='grid grid-cols-2 gap-4'>
            {(character?.age || character?.gender) && (
              <div className='mt-4'>
                <h2 className='font-pro-medium text-lg font-semibold text-primary'>Details:</h2>
                <p>Age: {character.age}</p>
                <p>Gender: {character.gender}</p>
              </div>
            )}
            {(character?.dateOfBirth?.day || character?.bloodType) && (
              <div className='mt-4'>
                <h2 className='font-pro-medium text-lg font-semibold text-primary'>
                  Additional Info:
                </h2>
                {character.bloodType && <p>Blood Type: {character.bloodType}</p>}
                {character.dateOfBirth?.day && (
                  <p>
                    Date of Birth: {character.dateOfBirth.day}/{character.dateOfBirth.month}/
                    {character.dateOfBirth.year}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {voiceActor.length > 0 && (
        <div>
          <h2 className='font-pro-medium text-lg font-semibold text-primary'>Voice Actors:</h2>
          <ScrollArea className='flex flex-nowrap overflow-x-auto whitespace-nowrap py-4'>
            {voiceActor.map((actor) => (
              <Card
                key={actor.id}
                className='mx-2 inline-block w-fit flex-shrink-0 overflow-hidden border-none py-2 text-white'
              >
                <Image
                  unoptimized
                  src={actor.image}
                  alt={actor.name.userPreferred}
                  width={100}
                  height={150}
                  className='mx-auto h-24 w-24 rounded-full object-cover shadow-lg'
                  priority
                />
                <CardHeader className='mt-4 space-y-0 p-0'>
                  <CardTitle className='text-md line-clamp-1 px-2 text-center font-pro-bold font-bold text-primary'>
                    {actor.name.userPreferred}
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>{actor.language}</CardContent>
              </Card>
            ))}
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      )}
    </main>
  );
};

export default Page;
