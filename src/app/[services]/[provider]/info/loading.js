import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function InfoSkeleton() {
  return (
    <div className='relative w-screen'>
      <div className='relative h-[340px] w-full'>
        <Skeleton className='h-full w-full' />
        <div className='absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent' />
      </div>
      <div className='-mt-80 flex w-full flex-col items-center justify-center gap-6'>
        <div className='flex w-full flex-col items-center gap-5 px-3 py-10 pt-12 md:flex-row md:items-end xl:px-14'>
          <Skeleton className='h-[250px] w-[180px] shrink-0 rounded' />
          <div className='z-10 flex w-full max-w-2xl flex-col gap-4'>
            <Skeleton className='mx-auto h-8 w-3/4 md:mx-0 lg:mx-0 xl:mx-0' />
            <div className='mx-auto md:mx-0'>
              <div className='my-2 hidden flex-wrap gap-2 sm:flex'>
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-6 w-20' />
              </div>
              <div className='my-2 hidden flex-wrap gap-2 sm:flex'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-24' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CharactersSkeleton() {
  return (
    <div className='py-4'>
      <Skeleton className='mb-4 h-8 w-40' />
      <div className='flex gap-4 overflow-hidden'>
        {[...Array(10)].map((_, i) => (
          <Card key={i} className='w-[160px] shrink-0 border-none'>
            <CardContent className='p-2'>
              <Skeleton className='mx-auto h-40 w-40 rounded-full' />
              <Skeleton className='mx-auto mt-4 h-6 w-32' />
              <Skeleton className='mx-auto mt-2 h-4 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function EpisodesSkeleton() {
  return (
    <div className='py-4'>
      <Skeleton className='mb-4 h-8 w-40' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className='p-2'>
              <Skeleton className='h-32 w-full' />
              <Skeleton className='mt-4 h-6 w-3/4' />
              <Skeleton className='mt-2 h-4 w-1/2' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className='-mt-16'>
      <InfoSkeleton />
      <div className='mx-4 space-y-8'>
        <CharactersSkeleton />
        <EpisodesSkeleton />
      </div>
    </main>
  );
}
