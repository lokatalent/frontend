"use client";
import LocationAutocomplete from "@/components/location/LocationAutocomplete";
import LocationTrack from "@/components/location/LocationTrack";
import { Spacer } from "@/components/Spacer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import schedule from "@/public/Images/schedule.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import {
  TbCircleNumber1,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";

const Page = () => {
  const [mapping, setMapping] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  const handleLocationSelect = (place: string) => {
    setSelectedLocation(place);
    setIsDisabled(false);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />

      <div className="bg-bgWhite h-svh">
        {!mapping && (
          <div className="flex flex-col justify-center contained mx-auto">
            <div className="my-4">
              <Spacer size={30} />
              <div className="flex flex-row justify-center space-x-4 items-center">
                <p className="flex flex-row space-x-3 items-center">
                  <span>
                    <TbCircleNumber1
                      size={28}
                      style={{ color: "#3377FF", borderColor: "#3377FF" }}
                    />
                  </span>
                  <span>Location</span>
                </p>
                <RxCaretRight size={20} />
                <p className="flex flex-row space-x-3 items-center">
                  <span>
                    <TbCircleNumber2Filled
                      size={28}
                      style={{ color: "#9EA3AEF", fill: "#3377FF99" }}
                    />
                  </span>
                  <span className="text-textGray3">Details</span>
                </p>
                <RxCaretRight size={20} />
                <p className="flex flex-row space-x-3 items-center">
                  <span>
                    <TbCircleNumber3Filled
                      size={28}
                      style={{ color: "#9EA3AEF", fill: "#3377FF99" }}
                    />
                  </span>
                  <span className="text-textGray3">Payment</span>
                </p>
              </div>
            </div>
            <Spacer size={50} />
            <div className="my-8">
              <h1 className="header my-5 text-center">
                Where do you need help?
              </h1>
              <Spacer size={40} />

              <LocationAutocomplete onSelect={handleLocationSelect} />

              <Dialog>
                <DialogTrigger asChild className="w-full">
                  <div className="flex justify-center mt-8">
                    <button
                      disabled={isDisabled}
                      className={`dialog-trigger ${
                        isDisabled
                          ? "btnOne opacity-25 max-w-[499px]"
                          : " btnOne  max-w-[499px] "
                      }`}
                    >
                      <p className="py-2">Continue</p>
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="px-12 ">
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
                      <p className="text-lg p-4 text-center">
                        Whether you need it now or later, we’ve got you covered
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-row justify-center space-x-3 w-full">
                    <DialogClose asChild>
                      <button
                        className="btnTwo border border-primaryBlue"
                        onClick={() => router.push("/schedule-booking")}
                      >
                        Schedule a Booking
                      </button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button
                        className="btnOne"
                        onClick={() => router.push("/instant-booking")}
                      >
                        Instant Booking
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        <LocationTrack mapping={mapping} setMapping={setMapping} />
      </div>
    </>
  );
};

export default Page;
