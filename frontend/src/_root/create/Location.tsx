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
import { setLocation } from '@/redux/state';
import { useDispatch } from 'react-redux';
import { getFlagUrl } from '@/lib/utils';

const LazyMap = lazy(() => import('../../components/Map'));

const Location = () => {
  const { getAllCountries, getCountryByValue } = useCountries();
  const [locationValue, setLocationValue] = useState("");
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    setLocationValue(value);
    const selectedCountry = getCountryByValue(value);
    if (selectedCountry) {
      dispatch(setLocation({
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
            <SelectLabel>Countries</SelectLabel>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex">
                        <img 
                          src={getFlagUrl(item?.value ?? '')}
                          alt={item?.flag}
                          width={20}
                        />
                        <span className="ml-2">
                          {item?.label} / {item?.region}
                        </span>
                      </div>
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

      <CreationBottomBar step={3} />
    </>
  );
}

export default Location;
