import PropertyCard from "@/components/PropertyCard";
import { useGetMyReservations } from "@/lib/react-query/queries";
import { IProperty } from "@/types";
import NoItem from "../components/NoItem";


const Reservations = () => {
  const { data: properties } = useGetMyReservations();
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {properties?.length === 0 ? (
        <NoItem
          title="Hey you dont have any Reservations"
        description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {properties?.map((property: IProperty) => (
            <PropertyCard
              key={property?.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Reservations;
