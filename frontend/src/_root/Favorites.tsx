import NoItem from "@/components/NoItem";
import PropertyCard from "@/components/PropertyCard";
import SkeletonLoading from '@/components/SkeletonLoading';
import { useGetFavorites } from "@/lib/react-query/queries";
import { setFavorites } from "@/redux/state";
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
  const { data, isSuccess, isPending } = useGetFavorites();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userInfo);
  const favorites = user?.favorites;

  useEffect(() => {
    if (!user) {
        navigate('/')
    }
    if (isSuccess && data) {
      dispatch(setFavorites(data.favorites));
    }
    //eslint-disable-next-line
  }, [isSuccess, data]);

  if (favorites?.length === 0 && isPending){
    return <SkeletonLoading />
  }

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {favorites?.length === 0 ? (
        <NoItem
          title="You don't have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {favorites?.map((item: IProperty) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
