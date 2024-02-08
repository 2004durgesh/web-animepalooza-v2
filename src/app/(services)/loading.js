import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
export function MiniSkeleton () {
    return (
        <div className="flex">
            <Skeleton className="h-8 w-[50px]" />
        </div>
    )
}
const Loading = () => {
    return (
        <>
            <div className='flex  overflow-hidden justify-evenly'>
                {Array(6).fill().map((_, i) => {
                    return (
                        <div key={i} className='m-4'>
                            <Skeleton className="h-80 w-[250px]" />
                            <div className='space-y-4 p-4'>
                                <div className="flex justify-start gap-x-8">
                                    <MiniSkeleton />
                                    <MiniSkeleton />
                                </div>
                                <div className="flex justify-start gap-x-8">
                                    <MiniSkeleton />
                                    <MiniSkeleton />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Loading