import PropertyCard from "@/components/PropertyCard";
import { useGetInfiniteProperties } from "@/lib/react-query/queries";
import { IProperty } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import NoItem from "./NoItem";
import SkeletonLoading from "./loaders/SkeletonLoading";
import { useToast } from "@/components/ui/use-toast";

const Properties = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);

  const {
    data,
    refetch,
    isPending,
    isRefetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteProperties(
    searchParams.get('category') ?? undefined,
    searchParams.get('country') ?? undefined,
    searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined,
    searchParams.get('rooms') ? Number(searchParams.get('rooms')) : undefined,
    searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined,
    enabled
  );
  
  const properties = data?.pages.flatMap((page) => page);
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (isError) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isError]);

  useEffect(() => {
    setEnabled(true);
    refetch();
    setEnabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  

  if ((isPending || isRefetching) && !isError) {
    return <SkeletonLoading />
  }

  return (
    <>
      {properties?.map((property, index) => property.results.length === 0 ? (
        <NoItem
          key={`no-item-${index}`}
          title="No properties found for your search"
          description="We couldn't find any properties that match your search criteria. Please try adjusting your search or filters to find what you're looking for."
          isSearched={true}
        />
        ) : (
          <div
            key={`property-list-${index}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8"
          >
            {property?.results?.map((p: IProperty) => (
              <PropertyCard
                key={p.id}
                property={p}
              />
            ))}
          </div>
      ))}
      {hasNextPage && !isError && (
        <div ref={ref} className="mt-10">
          <SkeletonLoading />
        </div>
      )}
    </>
  );
}

export default Properties;
