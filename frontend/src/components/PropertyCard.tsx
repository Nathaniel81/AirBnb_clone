import { useNavigate } from "react-router-dom";
import { useCountries } from "@/lib/hooks/useCountries";
import { useUpdateWishlist } from "@/lib/react-query/queries";
import { setWishlist } from "@/redux/state";
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { getFlagUrl } from "@/lib/utils";

interface AxiosError extends Error {
  response?: {
    status: number;
  };
}

interface PropertyProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyProps) => {
  const user = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    mutate: updateWishlist, 
    data,
    isPending,
    isSuccess,
    error
  } = useUpdateWishlist();
  const isError = error as AxiosError;
  
  const countryLabel = property?.address?.country;
  
  const { getAllCountries, getCountryByValue } = useCountries();
  const allCountries = getAllCountries();
  
  const countryByLabel = allCountries.find(
    (country) => country.label.toLowerCase() === countryLabel?.toLowerCase()
  );
  const country = getCountryByValue(countryByLabel?.value as string);

  const wishlist = user?.wishlist || [];

  const isLiked = wishlist?.find((item: IProperty) => item?.id === property.id);

  const iconStyle = isPending
  ? { color: 'gray', opacity: 0.5 }
  : { color: 'red', opacity: 1.0 };

  const handleClick = () => {
    if (!user){
      toast({
        title: 'Login Required',
        description: 'Please login or create an account.',
        variant: 'destructive',
      });
    }
    updateWishlist({property_id: property?.id})
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setWishlist(data.wish_list))
    }
    if (isError?.response?.status === 401) {
      toast({
        title: 'Login Required',
        description: 'Please login or create an account.',
        variant: 'destructive',
      });
    }
    //eslint-disable-next-line
  }, [isError, isSuccess, dispatch])


  return (
    <div
      onClick={() => {
        navigate(`/property/${property.id}`)
      }}
      className="flex flex-col">
      <div className="relative h-72 cursor-pointer overflow-hidden">
        <img
          src={property.photo}
          alt="Property image"
          className="rounded-lg h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
          <div 
            className="z-10 absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}>
            {isLiked ? <FaHeart style={iconStyle} /> : <FaRegHeart style={iconStyle} />}
          </div>
      </div>

      <div 
        className="mt-2">
        <h3 className="font-medium text-base flex">
          <img 
            src={getFlagUrl(countryByLabel?.value ?? '')}
            alt={country?.flag}
            width={25} 
            />
            <span className="ml-2">
              {country?.label} / {country?.region}
            </span>
        </h3>
        <p>
          {property.title}
        </p>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {property.description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${property.price}</span> Night
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
