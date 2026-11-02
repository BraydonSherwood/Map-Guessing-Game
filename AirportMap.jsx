import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AirportMap({ airport, guess, onGuess }) {
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const layers = useRef([]);

  useEffect(() => {
    if (!mapElement.current || mapInstance.current) return;

    const map = L.map(mapElement.current, {
      worldCopyJump: true,
      minZoom: 2,
    }).setView([15, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    map.on("click", (event) => {
      onGuess({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [onGuess]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    layers.current.forEach((layer) => layer.remove());
    layers.current = [];

    if (!airport || !guess) return;

    const guessPosition = [guess.latitude, guess.longitude];
    const airportPosition = [airport.latitude_deg, airport.longitude_deg];

    const guessMarker = L.marker(guessPosition)
      .addTo(map)
      .bindPopup("Your guess")
      .openPopup();

    const airportMarker = L.marker(airportPosition)
      .addTo(map)
      .bindPopup(airport.name);

    const line = L.polyline([guessPosition, airportPosition], {
      color: "#f97316",
      weight: 3,
      dashArray: "7 7",
    }).addTo(map);

    layers.current = [guessMarker, airportMarker, line];
    map.fitBounds(L.latLngBounds(guessPosition, airportPosition), {
      padding: [40, 40],
      maxZoom: 6,
    });
  }, [airport, guess]);

  return <div ref={mapElement} className="map" aria-label="Interactive world map" />;
}
