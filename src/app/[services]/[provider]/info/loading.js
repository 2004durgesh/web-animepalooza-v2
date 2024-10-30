import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function InfoSkeleton() {
  return (
    <div className="relative w-screen">
      <div className="w-full h-[340px] relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent" />
      </div>
      <div className="gap-6 w-full -mt-72 sm:-mt-16 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row w-full items-center md:items-end gap-5 pt-12 px-3 xl:px-14 py-10">
          <Skeleton className="shrink-0 w-[180px] h-[250px] rounded" />
          <div className="z-10 flex flex-col gap-4 w-full max-w-2xl">
            <Skeleton className="h-8 w-3/4 sm:mx-auto" />
            <div className="flex-wrap gap-2 sm:flex hidden">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex-wrap gap-2 sm:flex hidden">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CharactersSkeleton() {
  return (
    <div className="py-4">
      <Skeleton className="h-8 w-40 mb-4" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="w-[160px] shrink-0 border-none">
            <CardContent className="p-2">
              <Skeleton className="h-40 w-40 rounded-full mx-auto" />
              <Skeleton className="h-6 w-32 mx-auto mt-4" />
              <Skeleton className="h-4 w-24 mx-auto mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function EpisodesSkeleton() {
  return (
    <div className="py-4">
      <Skeleton className="h-8 w-40 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="-mt-16">
      <InfoSkeleton />
      <div className="mx-4 space-y-8">
        <CharactersSkeleton />
        <EpisodesSkeleton />
      </div>
    </main>
  );
}
