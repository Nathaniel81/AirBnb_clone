import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { IAmenities } from "@/types";
import { useEffect, useState } from "react";
import { setAmenities as setAmenitiesAction } from "@/redux/state";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { facilities } from "@/constants/facilities";
import { RootState } from "@/redux/store";

const Amenities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [amenities, setAmenities] = useState<string[]>([]);
  const amenitiesState = useSelector((state: RootState) => state.amenities);
  console.log(amenitiesState)
  
    const handleSelectAmenities = (facility: string) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((option) => option !== facility)
          );
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
    };
            
    useEffect(() => {
      dispatch(setAmenitiesAction(amenities))
    }, [amenities, dispatch])

    

  return (
    <div className='mt-10'>
      <div className="md:w-3/5 w-full mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        Tell guests what your place has to offer
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
        {facilities?.map((item: IAmenities) => (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={amenities.includes(item.name) ? "border-primary" : ""}
              onClick={() => handleSelectAmenities(item.name)}
            >
              <CardHeader>
                {item.icon}
                <h3 className="font-medium">{item.name}</h3>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <CreationBottomBar step={3} />
    </div>
  );
}

export default Amenities;
