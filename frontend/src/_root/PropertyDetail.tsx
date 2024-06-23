import AmenityShowcase from "@/components/AmenityShowcase";
import { BookingCard } from "@/components/BookingCard";
import CategoryShowcase from "@/components/CategoryShowcase";
import PropertyPageloading from "@/components/loaders/PropertyPageloading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";
import { useCountries } from "@/lib/hooks/useCountries";
import {
  useCreateReservation,
  useGetPropertyDetail,
  useGetReservations
} from "@/lib/react-query/queries";
import { getFlagUrl } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { IImage } from "@/types";
import { eachDayOfInterval, format } from "date-fns";
import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const LazyMap = lazy(() => import('../components/Map'));

const PropertyDetail = () =>  {
  const user= useSelector((state: RootState) => state.userInfo);
  const { toast } = useToast();
  const { id } = useParams();
  const { 
    data: propertyDetail, 
    isPending: isPropertyLoading 
  } = useGetPropertyDetail(id ?? '');
  const { data: reservations } = useGetReservations(id ?? '');
  const { 
    mutate: createReservation,
    isPending: isReservationLoading,
    isError,
    isSuccess
  } = useCreateReservation();

  const navigate = useNavigate();
  const { getAllCountries, getCountryByValue } = useCountries();
  const countryLabel = propertyDetail?.location?.country;

  const allCountries = getAllCountries();
  
  const countryByLabel = allCountries.find(
    (country) => country.label.toLowerCase() === countryLabel?.toLowerCase()
  );
  const country = getCountryByValue(countryByLabel?.value as string);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const endDate = new Date(dateRange[0].endDate);
  const startDate = new Date(dateRange[0].startDate);

  const start = format(new Date(dateRange[0].startDate), 'yyyy-MM-dd');
  const end = format(new Date(dateRange[0].endDate), 'yyyy-MM-dd');

  const endDateProps = format(new Date(dateRange[0].endDate), 'MM/dd/yyyy');
  const startDateProps = format(new Date(dateRange[0].startDate), 'MM/dd/yyyy');

  const dayCount = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1);
  const pricePerNight = (propertyDetail?.price * dayCount);
  const easebnbFee = 0.16 * pricePerNight;
  const totalPrice = pricePerNight + easebnbFee;
  

  let disabledDates: Date[] = [];
  //eslint-disable-next-line
  reservations?.forEach((reservationItem: any) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });
    disabledDates = [...disabledDates, ...dateRange];
  });
  //eslint-disable-next-line
  const handleDateChange = (item: any) => {
    const selection = item.selection;
    setDateRange([selection]);
  };

  const handleSubmit = useCallback(() => {
    if (!user) {
      return toast({
        title: 'Login Required',
        description: 'Please login or create an account.',
        variant: 'destructive',
      });
    }
    
    const bookingForm = {
      property: id,
      startDate: start,
      endDate: end,
      total_price: totalPrice
    };

    createReservation(bookingForm);
  //eslint-disable-next-line
  }, [user, id, start, end, totalPrice]);

  const handleShowAllPhotos = () => {
    navigate( `/property/${propertyDetail.id}/photos`, 
      { 
        state: { 
          images: propertyDetail.images 
        } 
      }
    );
  };
  

  useEffect(() => {
    if (isError){
        toast({
            title: 'Something went wrong. Please try again',
            variant: 'destructive',
          });
    }
    if (isSuccess) {
        navigate('/');
        toast({
            description: 'Reservation confirmed!',
          });
    }
    //eslint-disable-next-line
  }, [isSuccess, isError])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isPropertyLoading) {
    return <PropertyPageloading />
  }

  return (
    <div className="w-full mx-auto mt-10 mb-12 px-4 lg:px-0">
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-2xl mb-5">{propertyDetail?.title}</h1>
        {/* <div className="flex justify-between items-center space-x-4">
          <FaShareAlt className="text-xl cursor-pointer" />
          <FaHeart className="text-xl cursor-pointer" />
        </div> */}
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 md:gap-2 gap-y-2">
        <div className="col-span-2 row-span-2 aspect-w-1 aspect-h-1">
          <img
            src={propertyDetail?.images[0]?.image_url}
            alt="Property Image"
            className="rounded-lg h-full object-cover w-full"
          />
        </div>
        {propertyDetail?.images?.slice(1, 5).map((image: IImage, index: number) => (
          <div key={index} className="aspect-w-1 aspect-h-1">
            <img
              src={image.image_url}
              alt={`Property Image ${index + 2}`}
              className="rounded-lg h-full object-cover w-full"
            />
          </div>
        ))}
        <button
          onClick={handleShowAllPhotos}
          className="absolute bottom-2 right-6 bg-white text-black rounded-lg py-2 px-4 shadow-lg hover:bg-slate-300 flex items-center space-x-2">
          <span className="grid-icon"><BsFillGrid3X3GapFill /></span>
          <span>Show all photos</span>
        </button>
      </div>

      <div className="md:flex justify-between gap-x-8 lg:gap-x-24 mt-8">
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-medium flex items-center">
            <img 
              src={getFlagUrl(countryByLabel?.value ?? '')}
              alt={country?.flag}
              width={27}
              height={27}
            />
            <span className="ml-2">
              {country?.label} / {country?.region}
            </span>
          </h3>
          <div className="flex flex-wrap gap-x-2 text-muted-foreground mt-2">
            <p>{propertyDetail?.guests} Guests</p> 
            <span className="hidden sm:inline">•</span>
            <p>{propertyDetail?.bedrooms} Bedrooms</p> 
            <span className="hidden sm:inline">•</span>
            <p>{propertyDetail?.bathrooms} Bathrooms</p>
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                propertyDetail?.host?.picture ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {propertyDetail?.host?.first_name}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={propertyDetail?.category?.name as string} />

          <Separator className="my-7" />

          <AmenityShowcase amenities={propertyDetail?.amenities} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{propertyDetail?.description}</p>

          <Separator className="my-7" />

          <Suspense fallback={<Skeleton className="h-[50vh] w-full" />}>
            <LazyMap locationValue={country?.value as string} />
          </Suspense>
        </div>
        <div>
          <div className="w-full md:w-auto mt-8 md:mt-0">
            <input
              type="hidden"
              name="startDate"
              value={dateRange[0].startDate.toISOString()}
            />
            <input
              type="hidden"
              name="endDate"
              value={dateRange[0].endDate.toISOString()}
            />
            <DateRange
              date={new Date()}
              showDateDisplay={false}
              rangeColors={["#FF5A5F"]}
              ranges={dateRange}
              onChange={handleDateChange}
              minDate={new Date()}
              direction="vertical"
              disabledDates={disabledDates}
            />
          </div>
          <BookingCard 
            price={parseFloat(propertyDetail?.price)}
            start={startDateProps}
            end={endDateProps}
            dayCount={dayCount}
            serviceFee={easebnbFee}
            totalPrice={totalPrice}
            isReservationLoading={isReservationLoading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
