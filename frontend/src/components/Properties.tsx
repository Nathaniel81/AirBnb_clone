import { useGetProperties } from "@/lib/react-query/queries";
import { FileQuestion } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import SkeletonLoading from "./SkeletonLoading";
import { IProperty } from "@/types";

interface SearchParams {
	filter?: string;
	country?: string;
	guest?: string;
	room?: string;
	bathroom?: string;
  }

  const Properties: React.FC<{
	searchParams?: SearchParams;
  }> = ({ searchParams }) => {

  // const user = useSelector((state: RootState) => state.userInfo);
  const {data: properties, isPending, isRefetching} = useGetProperties("");

  console.log(isRefetching)
  if (isPending || isRefetching) {
    return <SkeletonLoading />
  }

  return (
    <>
      {properties?.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Sorry no listings found for this category...</h2>
          <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
            Please check another category or create your own listing!
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {properties?.map((property: IProperty) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Properties;
