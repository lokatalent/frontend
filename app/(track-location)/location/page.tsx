"use client";

import React, { useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  useMap,
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

  const map = useMap();
  console.log(map);

  return (
    <div className="w-screen h-screen">
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: 7.4667, lng: 4.5667 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}>
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
