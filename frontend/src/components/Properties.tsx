import { useGetProperties } from "@/lib/react-query/queries";
import PropertyCard from "@/components/PropertyCard";
import SkeletonLoading from "./SkeletonLoading";
import { IProperty } from "@/types";
import NoItem from "./NoItem";

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

  if (isPending || isRefetching) {
    return <SkeletonLoading />
  }

  return (
    <>
      {properties?.length === 0 ? (
        <NoItem
          title="Hey you dont have any favorites"
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
