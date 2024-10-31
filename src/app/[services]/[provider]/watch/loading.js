import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function VideoPlayerSkeleton() {
  return (
    <div className='flex w-full flex-col gap-4 md:flex-row'>
      {/* Main Video Player Area */}
      <div className='w-full md:w-3/4'>
        <Skeleton className='mx-auto aspect-video w-3/5 rounded-lg md:mx-0 md:w-4/5' />
        <div className='mt-4 space-y-4'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      </div>

      {/* Episodes Sidebar */}
      <div className='w-full space-y-4 md:w-1/4'>
        <div className='space-y-2'>
          {[...Array(5)].map((_, i) => (
            <Card key={i} className=''>
              <CardContent className='flex gap-3 p-2'>
                <Skeleton className='h-20 w-32 rounded' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-full' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className='m-4 -mt-12'>
      <VideoPlayerSkeleton />
    </main>
  );
}
