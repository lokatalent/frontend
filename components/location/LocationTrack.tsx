"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import enableLoc from "@/public/Images/enable-loc.png";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdLocationSearching } from "react-icons/md";

const LocationTrack = ({ mapping, setMapping }) => {
	const [streetName, setStreetName] = useState("");
	const [locationError, setLocationError] = useState(false);

	const handleLocationRequest = () => {
		setMapping(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					console.log("LATITUDE", latitude);

					// Use Google Maps Geocoding API to get the address;
					const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

					fetch(geocodingUrl)
						.then((response) => response.json())
						.then((data) => {
							const addressComponents = data.results[0].address_components;
							const streetNumber = addressComponents.find((component) =>
								component.types.includes("street_number"),
							);
							const route = addressComponents.find((component) =>
								component.types.includes("route"),
							);

							setStreetName(`${streetNumber?.long_name} ${route?.long_name}`);
						})
						.catch((error) => {
							console.error("Error fetching address:", error);
						});
				},
				(error) => {
					setLocationError(error?.message);
				},
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}

		setTimeout(() => {
			if (!streetName) {
				setLocationError(true);
			}
		}, 10000);
	};

	return (
		<div className="flex justify-center ">
			{mapping ? (
				<div className="bg-map h-svh w-full">
					<button
						onClick={() => setMapping(false)}
						className="m-8"
					>
						<FaArrowLeft />
					</button>
					<div className="flex h-full items-center justify-center">
						{streetName ? (
							<p>Your street: {streetName}</p>
						) : locationError ? (
							<div className="flex flex-col items-center ">
								<p className="text-3xl mb-4">Couldn't find location</p>
								<button
									className="btnOne mt-4 w-8/12"
									onClick={() => setMapping(false)}
								>
									Add location Manually
								</button>
							</div>
						) : (
							<p className="text-3xl flex flex-row ">
								<span className="bg-white h-10 w-10 rounded-full flex items-center justify-center">
									<MdLocationSearching
										width={28}
										height={28}
									/>
								</span>
								{"  "}
								<span>Tracking location please wait...</span>
							</p>
						)}
					</div>
				</div>
			) : (
				<Dialog>
					<DialogTrigger className="text-primaryBlue underline underline-offset-4 font-semibold">
						Track location
					</DialogTrigger>
					<DialogContent className=" ">
						<DialogHeader>
							<DialogTitle className="text-lg md:text-3xl mt-5 text-center">
								Grant Permission to Use Location
							</DialogTitle>
							<DialogDescription className=" flex flex-col justify-center items-center">
								<Image
									src={enableLoc}
									height={132}
									width={151}
									alt="track location"
								/>
								<p>Lorem ipsum dolor, sit</p>
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-row justify-center space-x-3 w-full">
							<DialogClose asChild>
								<button className="btnTwo">Enter Location Manually</button>
							</DialogClose>
							<button
								className="btnOne"
								onClick={handleLocationRequest}
							>
								Accept
							</button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default LocationTrack;
