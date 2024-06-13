import { facilities } from "@/constants/facilities";

const AmenityShowcase = ({ amenities }: { amenities: string[] }) => {
  const propertyFacilities = amenities.map((amenity) => 
    facilities.find((item) => item.name === amenity)
  );

  return (
    <div className="flex flex-col space-y-10">
      <h2 className="text-2xl font-semibold mt-5">What this place offers</h2>
      {propertyFacilities.map((amenity, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="text-xl">{amenity?.icon}</div>
          <div>
            <div className="font-semibold">{amenity?.name}</div>
            <div className="text-sm text-gray-500">{amenity?.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AmenityShowcase;
