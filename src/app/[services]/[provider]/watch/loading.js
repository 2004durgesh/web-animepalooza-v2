import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function VideoPlayerSkeleton() {
  return (
    <div className="flex md:flex-row flex-col gap-4 w-full">
      {/* Main Video Player Area */}
      <div className="w-full md:w-3/4">
        <Skeleton className="w-3/5 md:w-4/5 aspect-video rounded-lg mx-auto md:mx-0" />
        <div className="mt-4 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Episodes Sidebar */}
      <div className="w-full md:w-1/4 space-y-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="">
              <CardContent className="p-2 flex gap-3">
                <Skeleton className="h-20 w-32 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-full" />
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
    <main className="-mt-12 m-4">
      <VideoPlayerSkeleton />
    </main>
  );
}