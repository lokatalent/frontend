"use client";

import React, { useState } from "react";
import {
  ControlPosition,
  Map,
} from "@vis.gl/react-google-maps";

import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";
import "@vis.gl/react-google-maps/examples.css";

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

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
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
