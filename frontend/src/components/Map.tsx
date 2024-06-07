import { useCountries } from "@/lib/hooks/useCountries";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const ICON = icon({
  iconUrl: "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries();
  const latLng = getCountryByValue(locationValue)?.latLng;

  return (
    <MapContainer
      key={locationValue} // Key prop added to ensure re-render on locationValue change
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLng ?? [52.505, -0.09]}
      zoom={5}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      {latLng && <Marker position={latLng} icon={ICON} />}
    </MapContainer>
  );
}
