import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    let arr = Array.from({ length: 12 }, (_, i) => i + 1)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {arr.map((_, i) => (
                <div key={i} className='flex flex-col items-center justify-center shadow rounded'>
                    <Skeleton className='w-full h-96' />
                </div>
            ))}
        </div>
    )
}

export default loading