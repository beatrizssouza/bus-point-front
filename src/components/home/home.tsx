import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "./maps/map";
export default function Home() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  return (
    <div className="home">
      <Wrapper apiKey={"AIzaSyAatpcHpS4ESRO98ikcpCuZbYFqENEhqXo"}>
        <MapComponent center={center} zoom={zoom} />
      </Wrapper>
    </div>
  );
}
