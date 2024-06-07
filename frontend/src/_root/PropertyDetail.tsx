import CategoryShowcase from "@/components/CategoryShowcase";
import PropertyPageloading from "@/components/PropertyPageloading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";
import { useCountries } from "@/lib/hooks/useCountries";
import {
  useCreateReservation,
  useGetPropertyDetail,
  useGetReservations
} from "@/lib/react-query/queries";
import { RootState } from "@/redux/store";
import { eachDayOfInterval, format } from "date-fns";
import { Loader2 } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from 'react';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFlagUrl } from "@/lib/utils";

const LazyMap = lazy(() => import('../components/Map'));

const PropertyDetail = () =>  {
  const user= useSelector((state: RootState) => state.userInfo);
  const { toast } = useToast();
  const { id } = useParams();
  const { data: propertyDetail, isPending: isPropertyLoading } = useGetPropertyDetail(id ?? '');
  const { data: reservations } = useGetReservations(id ?? '');
  const { 
    mutate: createReservation, 
    isPending: isReservationLoading, 
    isError, 
    isSuccess  
  } = useCreateReservation();

  const navigate = useNavigate();
  const { getAllCountries, getCountryByValue } = useCountries();
  const countryLabel = propertyDetail?.address?.country;

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

  const start = format(new Date(dateRange[0].startDate), 'yyyy-MM-dd');
  const end = format(new Date(dateRange[0].endDate), 'yyyy-MM-dd');

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

  const handleSubmit = () => {
    if (!user) {
      toast({
          title: 'Login Required',
          description: 'Please login or create an account.',
          variant: 'destructive',
        });
    }
    const bookingForm = {
        property: id,
        startDate: start,
        endDate: end
    }
    createReservation(bookingForm);
  }

  useEffect(() => {
    if (isError){
        toast({
            title: 'Smoething went wrong. Please try again',
            variant: 'destructive',
          });
    }
    if (isSuccess) {
        navigate('/');
        toast({
            description: 'Reservation confirmed! Check your email for booking details.',
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
    <div className="w-full lg:w-3/4 mx-auto mt-10 mb-12 px-4 lg:px-0">
      <h1 className="font-medium text-2xl mb-5">{propertyDetail?.title}</h1>
      <div className="relative h-64 md:h-96 lg:h-[550px]">
        <img
          alt="Property Image"
          src={propertyDetail?.photo}
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="md:flex justify-between gap-x-8 lg:gap-x-24 mt-8">
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-medium flex items-center">
            <img 
              src={getFlagUrl(countryByLabel?.value ?? '')}
              alt={country?.flag}
              width={27} 
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

          <p className="text-muted-foreground">{propertyDetail?.description}</p>

          <Separator className="my-7" />

          <Suspense fallback={<Skeleton className="h-[50vh] w-full" />}>
            <LazyMap locationValue={country?.value as string} />
          </Suspense>
        </div>
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
          {isReservationLoading ? (
            <Button className="w-full mt-4" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Make a Reservation!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
