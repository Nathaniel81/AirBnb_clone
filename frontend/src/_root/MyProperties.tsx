import { useEffect } from 'react';
import PropertyCard from "@/components/PropertyCard";
import NoItem from "@/components/NoItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useGetUserProperties } from "@/lib/react-query/queries";
import SkeletonLoading from '@/components/SkeletonLoading';
import { useNavigate } from 'react-router-dom';
import { setMyProperties } from '@/redux/state';


const MyProperties = () => {
   const { data, isSuccess, isPending } = useGetUserProperties();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector((state: RootState) => state.userInfo);
   const myProperties = user?.myProperties;

   useEffect(() => {
    if (!user) {
        navigate('/')
    }
    if (isSuccess && data) {
      dispatch(setMyProperties(data));
    }
  }, [isSuccess, data, dispatch, navigate, user]);

  if (isPending) {
    return <SkeletonLoading />
  }

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {myProperties?.length === 0 ? (
        <NoItem
          description="Please list a hoeme on airbnb so that you can see it right here"
          title="Your dont have any Homes listed"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {myProperties?.map((property: IProperty) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyProperties;
