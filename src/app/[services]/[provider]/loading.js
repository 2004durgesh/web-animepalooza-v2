import React from 'react'
import { Skeleton } from "../../../components/ui/skeleton"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"

const SkeletonComponent = () => (
    <div className="h-6 w-1/4 bg-gray-300 rounded-md" />
);

const Loading = () => {
    return (
        <>
            <div className='flex flex-wrap justify-center'>
                {Array(6).fill().map((_, i) => {
                    return (
                        <Card key={i} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7 animate-pulse m-2">
                            <CardHeader>
                                <div className="h-[40px] bg-gray-300 rounded-md" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Skeleton className="h-48 w-full bg-gray-300 rounded-md" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-3/4 bg-gray-300 rounded-md" />
                                        <div className="flex justify-between">
                                            <SkeletonComponent />
                                            <SkeletonComponent />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <SkeletonComponent />
                                            <SkeletonComponent />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Loading