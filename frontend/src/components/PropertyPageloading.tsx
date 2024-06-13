import { Skeleton } from "@/components/ui/skeleton";

const PropertyPageloading = () => {
    return (
      <div className="w-full mx-auto mt-10">
        <Skeleton className="h-4 w-1/3" />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 md:gap-2 gap-y-2">
            <div className="col-span-2 row-span-2"> 
             <Skeleton className="w-full h-[500px]" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
  
        <div className="mt-8 flex justify-between gap-x-24">
          <div className="w-2/3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3 mt-3" />
          </div>
          <div className="w-1/3">
            <Skeleton className="w-full h-72" />
          </div>
        </div>
      </div>
    );
  }

export default PropertyPageloading;

