"use client";

import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  ControlPosition,
  Map,
} from "@vis.gl/react-google-maps";

import ControlPanel from "./control-panel";
import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";
import "@vis.gl/react-google-maps/examples.css";
// import "@vis.gl/react-google-maps/examples.js";

// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const API_KEY = "";

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
];

const LocationPlace = () => {
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
    <div className="w-screen h-screen">
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
