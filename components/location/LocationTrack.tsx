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

const LocationTrack = ({
  mapping,
  setMapping,
  dashboard,
  changeType,
  onTrack,
}: any) => {
  const [streetName, setStreetName] = useState("");
  const [locationCoords, setLocationCoords] = useState("");
  const [locationError, setLocationError] = useState(false);

  const handleLocationRequest = () => {
    setMapping(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Use Google Maps Geocoding API to get the address;
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              // console.log("Data", data);
              const addressComponents = data.results[0].address_components;
              // console.log(addressComponents);
              const plusCode = addressComponents.find((component: any) =>
                component.types.includes("plus_code")
              );
              const streetNumber = addressComponents.find((component: any) =>
                component.types.includes("street_number")
              );
              const route = addressComponents.find((component: any) =>
                component.types.includes("route")
              );
              const neighbourhood = addressComponents.find((component: any) =>
                component.types.includes("neighbourhood")
              );
              const city = addressComponents.find((component: any) =>
                component.types.includes("locality")
              );
              const area2 = addressComponents.find((component: any) =>
                component.types.includes("administrative_area_level_3")
              );
              const area1 = addressComponents.find((component: any) =>
                component.types.includes("administrative_area_level_2")
              );
              const state = addressComponents.find((component: any) =>
                component.types.includes("administrative_area_level_1")
              );
              const country = addressComponents.find((component: any) =>
                component.types.includes("country")
              );

              let formattedAddress = data.results[0].formatted_address;
              let region = `${city?.long_name}, ${state?.long_name}, ${country?.long_name}`;

              let addressStr = formattedAddress.split(",");

              let temp: any = [];

              for (let i = 0; i < addressStr.length; i++) {
                let str = addressStr[i].trim()
                if (str === city?.long_name || str === area2?.long_name || str === area1?.long_name || str === state?.long_name) break
                else temp.push(str)
              }
              let result = temp.join(", ")

              onTrack(result, region);
              setStreetName(region);
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        },
        (error) => {
          setLocationError(error?.message);
        },
        { enableHighAccuracy: true }
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
        <div>
          <p
            className="text-primaryBlue underline underline-offset-4 font-semibold cursor-pointer"
            onClick={changeType}
          >
            Enter location manually
          </p>
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
