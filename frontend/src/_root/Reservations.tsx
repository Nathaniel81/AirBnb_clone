import PropertyCard from "@/components/PropertyCard";
import SkeletonLoading from '@/components/SkeletonLoading';
import { useGetMyReservations } from "@/lib/react-query/queries";
import { setMyReservations } from '@/redux/state';
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NoItem from "../components/NoItem";


const Reservations = () => {
  const { data: properties, isSuccess, isPending } = useGetMyReservations();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userInfo);
  const myReservations = user?.myReservations ?? [];

  useEffect(() => {
   if (!user) {
       navigate('/')
   }
   if (isSuccess && properties) {
     dispatch(setMyReservations(properties));
   }
 }, [isSuccess, properties, dispatch, navigate, user]);

 if (isPending) {
   return <SkeletonLoading />
 }

  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {myReservations?.length === 0 ? (
        <NoItem
          title="You don't have any reservations yet"
          description="Once you make a reservation, it will show up right here. Let's get started!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {myReservations?.map((property: IProperty) => (
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
