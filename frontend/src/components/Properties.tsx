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
          description="Please add favorites to see them right here..."
      />
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
