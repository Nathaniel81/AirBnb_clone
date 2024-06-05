import { useEffect } from 'react';
import PropertyCard from "@/components/PropertyCard";
import NoItem from "@/components/NoItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useGetFavorites } from "@/lib/react-query/queries";
import { setWishlist } from "@/redux/state";
import SkeletonLoading from '@/components/SkeletonLoading';
import { useNavigate } from 'react-router-dom';


const Favorites = () => {
  const { data, isSuccess, isPending } = useGetFavorites();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userInfo);
  const wishlist = user?.wishlist;

  useEffect(() => {
    if (!user) {
        navigate('/')
    }
    if (isSuccess && data) {
      dispatch(setWishlist(data.wish_list));
    }
    //eslint-disable-next-line
  }, [isSuccess, data]);

  if (wishlist?.length === 0 && isPending){
    return <SkeletonLoading />
  }

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {wishlist?.length === 0 ? (
        <NoItem
          title="Hey you don't have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {wishlist?.map((item: IProperty) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
