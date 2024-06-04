import { Link } from "react-router-dom";
import { useCountries } from "@/lib/hooks/useCountries";

// import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
// import { DeleteFromFavorite, addToFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

const PropertyCard = ({ property }) => {
  // const { getCountryByValue } = useCountries();
  // const country = getCountryByValue(property?.address?.country);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <img
          src={property.photo}
          alt="Property image"
          className="rounded-lg h-full object-cover"
        />

        {/* {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )} */}
      </div>

      <Link to={`/home/${property.id}`} className="mt-2">
        <h3 className="font-medium text-base">
          {/* {country?.flag} {property?.address?.country} / {property?.address?.continent} */}
          {property.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {property.description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${property.price}</span> Night
        </p>
      </Link>
    </div>
  );
}

export default PropertyCard;
