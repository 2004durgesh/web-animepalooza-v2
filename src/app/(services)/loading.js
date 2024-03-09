import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
const SkeletonComponent = () => (
    <div className="h-6 w-1/4 bg-gray-300 rounded-md" />
  );
const Loading = () => {
    return (
        <>
            <div className='flex  overflow-hidden justify-evenly'>
                {Array(6).fill().map((_, i) => {
                    return (
                        <Card key={i} className="w-[322px] animate-pulse mx-4">
                            <CardHeader>
                                <div className="h-[40px] bg-gray-300 rounded-md" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Skeleton className="h-48 w-full bg-gray-300 rounded-md" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-3/4 bg-gray-300 rounded-md" />
                                        <div className="flex justify-between">
                                            <SkeletonComponent/>
                                            <SkeletonComponent/>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <SkeletonComponent/>
                                            <SkeletonComponent/>
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