"use client"
import React, { useEffect, useState, Suspense } from 'react'
import fetchData from '../../../../components/Datafetcher'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import parse from 'html-react-parser'
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"

const Page = ({ params }) => {
    const searchParams = useSearchParams()
    const info_id = searchParams.get('info_id')
    const [voiceActor, setVoiceActor] = useState([])
    const [character, setCharacter] = useState({})
    const fetchInfo = async () => {
        const info = await fetchData('meta', 'anilist', `data/${info_id}`, { provider: params.provider })
        const character = await fetchData('meta', 'anilist', `character/${params.character_id}`)

        info?.characters.map((item) => {
            if (item.id == params.character_id) {
                setVoiceActor(item.voiceActors)
                console.log(item.voiceActors);
            }
        });
        setCharacter(character)
        console.log(voiceActor);
        return character
    }
    useEffect(() => {
        fetchInfo()
    }, [])
    return (
        <main className="p-4">
            <div className='flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0'>
                {character?.image && <Image src={character?.image} alt={character?.name?.userPreferred} width={197} height={296} className="w-full md:w-48 h-72 object-cover rounded-lg shadow-lg" priority />}
                <div className='w-full'>
                    <h1 className='text-2xl font-bold font-pro-bold text-primary'>
                        {character.name?.userPreferred} / {character.name?.native}
                    </h1>
                    <p className='mt-2 font-pro-regular'>
                        {parse(String(character.description))}
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                        {(character?.age || character?.gender) && <div className='mt-4'>
                            <h2 className='text-lg font-semibold font-pro-medium text-primary'>Details:</h2>
                            <p>Age: {character.age}</p>
                            <p>Gender: {character.gender}</p>
                        </div>}
                        {(character?.dateOfBirth?.day || character?.bloodType) && <div className='mt-4'>
                            <h2 className='text-lg font-semibold font-pro-medium text-primary'>Additional Info:</h2>
                            {character?.bloodType && <p>Blood Type: {character?.bloodType}</p>}
                            {character?.dateOfBirth?.day && <p>Date of Birth: {character?.dateOfBirth?.day}/{character?.dateOfBirth?.month}/{character?.dateOfBirth?.year}</p>}
                        </div>}
                    </div>
                </div>
            </div>
            {voiceActor.length > 0 && <div>
                <h2 className='text-lg font-semibold font-pro-medium text-primary'>Voice Actors: </h2>
                <ScrollArea className='flex flex-nowrap overflow-x-auto whitespace-nowrap py-4'>
                    {voiceActor.map((actor) => (
                        <Card key={actor.id} className='overflow-hidden mx-2 py-2 w-fit text-white border-none inline-block flex-shrink-0'>
                            <Image src={actor.image} alt={actor.name.userPreferred} width={100} height={150} className="w-24 h-24 object-cover  rounded-full mx-auto shadow-lg" priority />
                            <CardHeader className='space-y-0 p-0 mt-4'>
                                <CardTitle className='px-2 text-md font-bold font-pro-bold text-primary line-clamp-1 text-center'>
                                    {actor.name.userPreferred}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                {actor.language}
                            </CardContent>
                        </Card>
                    ))}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>}
        </main>
    )
}

export default Page