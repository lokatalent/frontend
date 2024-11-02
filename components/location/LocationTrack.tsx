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
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LocationTrack = () => {
	const [location, setLocation] = useState(null);
	const router = useRouter();
	const defaultMapOptions = {
		zoomControl: true,
		tilt: 0,
		gestureHandling: "auto",
		mapTypeId: "satellite",
	};
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const handleLocationRequest = () => {
		router.push("/make-booking");
		console.log("API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					console.log("position", position.coords.latitude);
				},
				(error) => {
					
					console.error("Error fetching location", error);
				},
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};
	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div className="flex justify-center mt-8">
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

			{location && (
				<GoogleMap
					zoom={15}
					center={location}
					options={defaultMapOptions}
					mapContainerStyle={{
						width: "100%",
						height: "80vh",
						borderRadius: "15px 0px 0px 15px",
					}}
				>
					<Marker position={location} />
				</GoogleMap>
			)}
		</div>
	);
};

export default LocationTrack;
