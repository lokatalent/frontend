import { useEffect, useRef, useState } from "react";

const LocationAutocomplete = ({ onSelect }) => {
	const [inputValue, setInputValue] = useState("");
	const autocompleteRef = useRef(null);

	useEffect(() => {
		// Initialize Google Places Autocomplete once Google Maps API is loaded
		if (window.google && !autocompleteRef.current) {
			const input = document.getElementById("autocomplete-input");
			autocompleteRef.current = new window.google.maps.places.Autocomplete(
				input,
				{
					types: ["address"], // Restrict to address suggestions only
				},
			);

			autocompleteRef.current.addListener("place_changed", () => {
				const place = autocompleteRef.current.getPlace();
				if (place && place.formatted_address) {
					setInputValue(place.formatted_address);
					onSelect(place);
				}
			});
		}
	}, []);

	return (
		<input
			id="autocomplete-input"
			type="text"
			className="input-class w-full mx-auto placeholder:text-textGray2 mb-4"
			placeholder="Enter a location"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
		/>
	);
};

export default LocationAutocomplete;
