import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


const Loading = () => {
    
    return (
        <>
            <div className="w-full p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <Card key={index} className="h-[190px] w-[135px] xl:h-[265px] xl:w-[185px] border-none overflow-hidden rounded-lg shadow-lg">
                            <CardContent className="p-0 h-full relative">
                                <Skeleton className="w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-3 w-full mb-2" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-1/4" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Loading