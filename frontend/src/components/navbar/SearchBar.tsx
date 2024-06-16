import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useCountries } from "@/lib/hooks/useCountries";
import Counter from "../Counter";
import Map from "../Map";
import { getFlagUrl } from "@/lib/utils";

import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [step, setStep] = useState(1);
  const [searchParams, setSearchParams] = useState({
    country: '',
    guests: 0,
    bathrooms: 0,
    rooms: 0
  });

  const [locationValue, setLocationValue] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { getAllCountries, getCountryByValue } = useCountries();

  //eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    setLocationValue(value);
    const selectedCountry = getCountryByValue(value);
    if (selectedCountry) {
      setSearchParams(prevParams => ({ ...prevParams, country:  selectedCountry.label}))
    }
  };

  const handleSearch = () => {
    setOpen(false);
    navigate(
      `/?category=&` +
      `country=${searchParams.country}&` +
      `guests=${searchParams.guests}&` +
      `rooms=${searchParams.rooms}&` +
      `bathrooms=${searchParams.bathrooms}`,
    )
    
    setLocationValue('');
    setStep(1);
  }

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      return (
        <Button onClick={() => handleSearch()} type="button">
          Next
        </Button>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-full hover:shadow-md py-2 px-5 sm:border flex items-center cursor-pointer ml-auto sm:ml-0">
          <div className="hidden sm:flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>

          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Pleae Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={handleSelectChange}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
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
              <Map locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>
                  Please Choose a Country, so that what you want
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter 
                      value={searchParams.guests} 
                      onChange={
                        (value) => setSearchParams(
                          prevParams => ({ ...prevParams, guests: value })
                      )} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms do you have?
                      </p>
                    </div>
                    <Counter 
                      value={searchParams.rooms} 
                      onChange={
                        (value) => setSearchParams(
                          prevParams => ({ ...prevParams, rooms: value })
                      )} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms do you want?
                      </p>
                    </div>
                    <Counter 
                      value={searchParams.bathrooms}
                      onChange={
                        (value) => setSearchParams(
                          prevParams => ({ ...prevParams, bathrooms: value })
                      )} />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SearchBar;
