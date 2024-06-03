import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "@/lib/hooks/useCountries";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(locationValue)?.latLang;

  return (
    <MapContainer
      key={locationValue} // Key prop added to ensure re-render on locationValue change
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={5}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      {latLang && <Marker position={latLang} icon={ICON} />}
    </MapContainer>
  );
}
