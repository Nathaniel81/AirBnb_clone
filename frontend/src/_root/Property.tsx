import CategoryShowcase from "@/components/CategoryShowcase";
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCountries } from "@/lib/hooks/useCountries";
import {
    useCreateReservation,
    useGetPropertyDetail,
    useGetReservations
} from "@/lib/react-query/queries";
import { setPropertyDetail } from "@/redux/state";
import { RootState } from "@/redux/store";
import { eachDayOfInterval, format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LazyMap = lazy(() => import('../components/Map'));

const Property = () =>  {
  const data = useSelector((state: RootState) => state.propertyDetail);
  const user= useSelector((state: RootState) => state.userInfo);
  const { toast } = useToast();
  const { id } = useParams();
  const { data: propertyDetail } = useGetPropertyDetail(id ?? '');
  const { data: reservations } = useGetReservations(id ?? '');
  const { 
    mutate: createReservation, 
    isPending, 
    isError, 
    isSuccess  
  } = useCreateReservation();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state || {};
  const { getAllCountries, getCountryByValue } = useCountries();
  const countryLabel = data?.address?.country;
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
    if (property) {
        dispatch(setPropertyDetail(property));
    }
    if (JSON.stringify(propertyDetail) != JSON.stringify(data)) {
        dispatch(setPropertyDetail(propertyDetail));
    }
  //eslint-disable-next-line
  }, [dispatch, propertyDetail]);

  useEffect(() => {
    if (isError){
        console.log('error')
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

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <img
          alt="Property Image"
          src={data?.photo}
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {/* {country?.flag} {country?.label} / {country?.region} */}
            {/* {country?.flag} {data?.address?.country} / {data?.address?.continent} */}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> • <p>{data?.bedrooms} Bedrooms</p> •{" "}
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                data?.host?.picture ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.host?.first_name}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.category?.name as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <Suspense fallback={<Skeleton className="h-[50vh] w-full" />}>
            <LazyMap locationValue={country?.value as string} />
          </Suspense>
        </div>
        <div>
          {/* <SelectCalender reservation={reservations} /> */}
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
          {isPending ? (
            <Button className="w-full" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSubmit}>
              Make a Reservation!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Property;