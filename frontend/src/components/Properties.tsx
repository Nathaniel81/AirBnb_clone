import PropertyCard from "@/components/PropertyCard";
import { useGetProperties } from "@/lib/react-query/queries";
import { IProperty } from "@/types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NoItem from "./NoItem";
import SkeletonLoading from "./SkeletonLoading";

const Properties = () => {
  const location = useLocation();
  const { searchParams } = location.state || {};
  const { data: properties, isPending, isRefetching, refetch } = useGetProperties(
    undefined,
    searchParams?.country,
    searchParams?.guests,
    searchParams?.rooms,
    searchParams?.bathrooms,
  );
  useEffect(() => {
    if (searchParams ) {
      refetch();
    }
  }, [refetch, searchParams]);

  if (isPending || isRefetching) {
    return <SkeletonLoading />
  }

  return (
    <>
      {properties?.length === 0 ? (
        <NoItem
          title="No properties found for your search"
          description="We couldn't find any properties that match your search criteria. Please try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8">
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
