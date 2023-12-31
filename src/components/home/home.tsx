import { Button } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { DataPoint } from "../../@types/DataPoint";
import { Context } from "../../context/resources";
import { getAllListPoint } from "../../services/http-common";

type localization = {
  lat: number;
  lng: number;
};
export default function Home() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<localization>({
    lat: -24.044281,
    lng: -52.377591,
  });

  const zoom = 4;
  const [markers, setMarkers] = useState<DataPoint[]>([]);

  const mapStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    margin: "3%",
    height: "75vh",
    width: "95%",
    borderRadius: 10,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      setCenter({ lat: res.coords.latitude, lng: res.coords.longitude });
      console.log(res.coords);
    });

    getAllListPoint().then((res) => setMarkers(res));
  }, []);

  return (
    <div className="home">
      <LoadScript
        id="google-map-script"
        googleMapsApiKey="AIzaSyA_Pw2JlYqi869VC-6gkM2203eo7Pqrh0c"
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={center}
          zoom={19}
          onLoad={(map) => setMap(map)}
        >
          {markers.map((markers: DataPoint) => {
            return (
              <Marker
                key={markers.id}
                position={{
                  lat: Number(markers.lat),
                  lng: Number(markers.lng),
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>

      <div
        style={{
          marginTop: "1%",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Button variant="contained" style={{ backgroundColor: "#272529a4" }}>
          Consultar Linhas/Horarios
        </Button>
      </div>
    </div>
  );
}
