import { useNavigate } from "react-router-dom";
import { useCountries } from "@/lib/hooks/useCountries";
import { useUpdateFavorites } from "@/lib/react-query/queries";
import { setFavorites } from "@/redux/state";
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import React, { useEffect, useState } from "react";
import { 
  FaHeart, 
  FaRegHeart, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + property?.images.length) % property?.images.length
    );
  };

  const goToNextSlide = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % property?.images.length);
  };
  
  const { 
    mutate: updateFavorites, 
    data,
    isPending,
    isSuccess,
    error
  } = useUpdateFavorites();
  const isError = error as AxiosError;
  
  const countryLabel = property?.location?.country;
  
  const { getAllCountries, getCountryByValue } = useCountries();
  const allCountries = getAllCountries();
  
  const countryByLabel = allCountries.find(
    (country) => country.label.toLowerCase() === countryLabel?.toLowerCase()
  );
  const country = getCountryByValue(countryByLabel?.value as string);

  const Favorites = user?.favorites || [];

  const isLiked = Favorites?.find((item: IProperty) => item?.id === property.id);

  const iconStyle = isPending
  ? { color: 'gray', opacity: 0.5 }
  : isLiked ? 
  { color: 'red' } : { color: 'white' };

  const handleClick = () => {
    if (!user){
      toast({
        title: 'Login Required',
        description: 'Please login or create an account.',
        variant: 'destructive',
      });
    }
    updateFavorites({property_id: property?.id})
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setFavorites(data.favorites))
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
        <div className="relative h-full w-full transition-transform duration-500 ease-in-out"
         style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image.image_url}
              alt={`Property image ${index + 1}`}
              className="absolute top-0 left-0 h-full w-full object-cover rounded-lg"
              style={{ left: `${index * 100}%` }}
            />
          ))}
        </div>
        <div 
          className="z-10 absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}>
          {isLiked ? <FaHeart style={iconStyle} /> : <FaRegHeart style={iconStyle} />}
        </div>
        
        <div
          className={
            `${currentIndex === 0 && "hidden"} 
            absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 cursor-pointer`
          }
          onClick={goToPrevSlide}>
          <FaChevronLeft />
        </div>
        <div
          className={
            `${currentIndex === property.images.length - 1 && "hidden"} 
            absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 cursor-pointer`}
          onClick={goToNextSlide}>
          <FaChevronRight />
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-medium text-base flex">
          <img 
            src={getFlagUrl(countryByLabel?.value ?? '')}
            alt={country?.flag}
            width={25}
            height={25}
            loading="lazy"
          />
          <span className="ml-2">
            {country?.label} / {country?.region}
          </span>
        </h3>
        <p>
          {property.title}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${property.price}</span> Night
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
