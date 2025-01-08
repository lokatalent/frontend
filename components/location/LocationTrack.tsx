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
import schedule from "@/public/Images/schedule.png";
import { useRouter } from "next/navigation";

const LocationTrack = ({ mapping, setMapping, dashboard, changeType, onTrack }: any) => {
  const [streetName, setStreetName] = useState("");
  const [locationError, setLocationError] = useState(false);

  //TODO: Location autocomplete only works when i refresh the location screen on the browser
  //TODO: Track location is not tracking my particular location, ive not tracked it with another location

  const handleLocationRequest = () => {
    setMapping(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("LOCATION", latitude, longitude);

          // Use Google Maps Geocoding API to get the address;
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              const addressComponents = data.results[0].address_components;
              onTrack(data.results[0].formatted_address)
              const streetNumber = addressComponents.find((component) =>
                component.types.includes("street_number")
              );
              const route = addressComponents.find((component) =>
                component.types.includes("route")
              );

              setStreetName(`${streetNumber?.long_name} ${route?.long_name}`);
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        },
        (error) => {
          setLocationError(error?.message);
        }
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

  const router = useRouter();
  const isDisabled = false;

  return (
    <div className="flex justify-center ">
      {mapping ? (
        <p className="text-primaryBlue underline underline-offset-4 font-semibold cursor-pointer" onClick={changeType}>Enter location manually</p>
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
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row justify-center space-x-3 w-full">
              <DialogClose asChild>
                <button className="btnTwo">Enter Location Manually</button>
              </DialogClose>
              <button className="btnOne" onClick={handleLocationRequest}>
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
