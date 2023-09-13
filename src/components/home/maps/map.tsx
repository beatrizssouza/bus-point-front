import { useEffect, useRef } from "react";
import { addSingleMarkers } from "./addSingleMarkers";

export default function MapComponent(
  center: google.maps.LatLngLiteral | any,
  zoom: number
) {
  const ref = useRef<HTMLDivElement>(null);

  const locations: ReadonlyArray<google.maps.LatLngLiteral> = [
    { lat:  -24.0612754, lng: -52.3870305 },
  ];

  
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
      center:{
        lat: -24.0605001,
        lng: -52.3895388
      },
      zoom: 15,
    });

    addSingleMarkers({locations, map})
  });

  return (
    <div ref={ref} id="map" style={{ width: "100%", height: "90vh"}} />
  );
}
