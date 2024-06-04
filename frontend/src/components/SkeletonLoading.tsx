import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => {
  const repeatCount = 9;
  const skeletonArray = Array.from({ length: repeatCount });

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {skeletonArray.map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-72 w-full rounded-lg" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
