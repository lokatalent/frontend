"use client";

import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  ControlPosition,
  Map,
} from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";
import "@vis.gl/react-google-maps/examples.css";
import { useRouter, useSearchParams } from "next/navigation";

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
];

const LocationPlace = () => {
  const router = useRouter();
  const params = useSearchParams();
  const selectedService = params.get("service");

  useEffect(() => {
    if (!selectedService) router.push("/dashboard/bookings/select-service");
  }, []);

  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [pinLocation, setPinLocation] = useState<{ lat: number; lng: number }>({
    lat: 7.4667,
    lng: 4.5667,
  });

  useEffect(() => {
    let lat = selectedPlace?.geometry?.location?.lat() ?? 0;
    let lng = selectedPlace?.geometry?.location?.lng() ?? 0;
    setPinLocation({ lat, lng });
  }, [selectedPlace]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: 7.4667, lng: 4.5667 }}
        gestureHandling="none"
        zoomControl={false}
        disableDefaultUI={true}
        mapId={"4ebe333352e7e56f "}
      >
        <AdvancedMarker position={pinLocation} />
      </Map>

      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />

      {/* <ControlPanel
        autocompleteModes={autocompleteModes}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onAutocompleteModeChange={setSelectedAutocompleteMode}
      /> */}

      <MapHandler place={selectedPlace} />
    </div>
  );
};

export default LocationPlace;
