import { useState, lazy, Suspense } from 'react';
import CreationBottomBar from '@/components/CreationBottomBar';
import { useCountries } from '@/lib/hooks/useCountries';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { setAddress } from '@/redux/state';
import { useDispatch } from 'react-redux';

const LazyMap = lazy(() => import('../components/Map'));

const Address = () => {
  const { getAllCountries, getCountryByValue } = useCountries();
  const [locationValue, setLocationValue] = useState("");
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    setLocationValue(value);
    const selectedCountry = getCountryByValue(value);
    if (selectedCountry) {
      dispatch(setAddress({
        country: selectedCountry.label,
        continent: selectedCountry.region,
      }));
    }
  };

  return (
    <>
      <div className="w-3/5 mx-auto mt-10">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <div className="w-3/5 mx-auto mb-36">
        <div className="mb-5">
          <Select required onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {getAllCountries().map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <span role="img" aria-label={item.label}>{item.flag}</span> {item.label} / {item.region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Suspense fallback={<Skeleton className="h-[50vh] w-full" />}>
          <LazyMap locationValue={locationValue} />
        </Suspense>
      </div>

      <CreationBottomBar />
    </>
  );
}

export default Address;
