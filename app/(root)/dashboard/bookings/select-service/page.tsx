"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SelectService() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const bookService = () => {
    router.push(`/dashboard/bookings/location?service=${encodeURIComponent(selectedService)}`);
  };

  // const services = ['Driv]

  return (
    <div className="">
      <h1 className="font-semibold text-3xl text-center">What Service are you looking for?</h1>
      <div className="flex gap-2 my-4 md:my-5 xl:my-8 max-w-4xl mx-auto mt-10">
        <div className="flex-1">
          <Select value={selectedService} onValueChange={handleServiceChange}>
            <SelectTrigger className="appearance-none h-12 md:h-14 xl:h-16 px-2 pr-8 xl:text-lg bg-transparent border-2 border-gray-300 bg-white rounded-md focus:outline-none">
              {selectedService ? (
                <SelectValue>{selectedService}</SelectValue>
              ) : (
                <SelectValue placeholder="What services do you need?" />
              )}
            </SelectTrigger>
            <SelectContent className="w-[414px]">
              <SelectGroup>
                <SelectItem value="Indoor Cleaning Services">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Indoor Cleaning Services</p>
                    <p className="font-light">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="Driving">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Driving</p>
                    <p className="font-light">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          onClick={bookService}
          className="bg-[#ede8e8] h-12 md:h-14 xl:h-16 w-16 rounded flex items-center justify-center cursor-pointer"
        >
          <CiSearch color="black" />
        </div>
      </div>
    </div>
  );
}

export default SelectService;