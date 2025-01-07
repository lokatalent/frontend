import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import schedule from "@/public/Images/schedule.png";
import { useDispatch } from "react-redux";
import { setBookingLocation } from "@/store/profile/bookingSlice";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const PlaceAutocompleteClassic = ({ onPlaceSelect }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      componentRestrictions: { country: "ng" },
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
      const place = placeAutocomplete.getPlace()
      setSelectedLocation(place.formatted_address)
      dispatch(setBookingLocation(place.formatted_address))
      setIsDisabled(false)
    });
  }, [onPlaceSelect, placeAutocomplete]);


  return (
    <div className="border rounded-md w-full bg-white p-4 mt-24">
      <h1 className="text-center text-lg font-medium mb-3">
        Where do you need help?
      </h1>
      <div className="">
        <input
          className="hidden border-gray-200 rounded mb-3 px-3 text-sm border h-10 w-full focus:outline-blue-500"
          placeholder="Apartment No/Name (optional)"
        />
        <input
        placeholder="Street address/landmark"
          className="border-gray-200 rounded mb-3 px-3 text-sm border h-10 sm:w-[350px] md:w-[400px] focus:outline-blue-500"
          ref={inputRef}
        />
      </div>
      {/* <button className='bg-navBlue text-white rounded mb-2 px-3 text-sm h-10 w-full'>Set Location</button> */}
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <div className="flex justify-center mt-">
            <button
              disabled={isDisabled}
              className={`dialog-trigger ${
                isDisabled
                  ? "border-gray-200 bg-navBlue text-white rounded px-3 text-sm border h-10 w-full opacity-25 max-w-[499px]"
                  : "border-gray-200 bg-navBlue text-white rounded px-3 text-sm border h-10 w-full max-w-[499px] "
              }`}
            >
              <p className="py-">Continue</p>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="px-4 md:px-8">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-3xl mt-5 px-3 text-center font-medium">
              Instant Booking or Schedule a Booking?
            </DialogTitle>
            <DialogDescription className=" flex flex-col justify-center items-center">
              <Image
                src={schedule}
                height={192}
                width={151}
                alt="track location"
              />
              <p className="text-base md:text-lg p-4 text-center">
                Whether you need it now or later, we’ve got you covered
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row justify-center gap-3 w-full">
            <DialogClose asChild>
              <button
                className="text-base md:text-lg btnTwo border border-primaryBlue"
                onClick={() => router.push("/dashboard/bookings/schedule-booking")}
              >
                Schedule a Booking
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                className="text-base md:text-lg btnOne"
                onClick={() => router.push("/dashboard/bookings/instant-booking")}
              >
                Instant Booking
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      {/* <p className="text-center text-sm text-primaryBlue mt-4 font-medium cursor">Track my location</p> */}
    </div>
  );
};
