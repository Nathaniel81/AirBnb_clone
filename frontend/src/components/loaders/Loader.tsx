import { Skeleton } from "@/components/ui/skeleton";
// import SkeletonLoading from "./SkeletonLoading";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="mx-auto px-5 lg:px-[5%]">
      <nav className="w-full border-b">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 hidden lg:block rounded-full" />
            <Skeleton className="w-24 h-7 hidden lg:block" />
            <Skeleton className="w-24 h-8 block lg:hidden" />
          </div>
          <Skeleton className="h-12 w-[420px] rounded-full mx-4" />
          <Skeleton className="w-24 h-12 rounded-full w-" />
        </div>
      </nav>
          <div className="w-full flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
      {/* <SkeletonLoading/> */}
      {/* <PropertyDetailLoading /> */}
    </div>
  );
};

export default Loader;
