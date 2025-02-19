"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setBookingService } from "@/store/profile/bookingSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

function DropDownElement() {
  const router = useRouter();
  const dispatch = useDispatch();
  const allAvailableServices = useSelector((state: any) => state.booking?.allServices);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    bookService(value);
  };

  const bookService = (selectedService: any) => {
    dispatch(setBookingService(selectedService));
    router.push(`/location?service=${encodeURIComponent(selectedService)}`);
  };

  return (
    <div className="flex gap-2 my-4 md:my-5 xl:my-8 max-w-xl">
      <div className="w-full">
        <Select value={selectedService} onValueChange={handleServiceChange}>
          <SelectTrigger className="appearance-none h-12 md:h-14 xl:h-16 px-2 pr-8 xl:text-lg bg-transparent border-2 border-white rounded-md focus:outline-none">
            {selectedService ? (
              <SelectValue>{selectedService}</SelectValue>
            ) : (
              <SelectValue placeholder="What services do you need?" />
            )}
          </SelectTrigger>
          <SelectContent className="max-w-[320px] sm:max-w-md">
            <SelectGroup>
              {allAvailableServices.map((service: object) => (
                <SelectItem value={service?.service_type} key={service?.id}>
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold capitalize">{service?.service_type}</p>
                    <p className="font-light">{service?.service_desc}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-[#ede8e8] h-12 md:h-14 xl:h-16 w-16 rounded flex items-center justify-center cursor-pointer">
        <CiSearch color="black" />
      </div>
    </div>
  );
}

export default DropDownElement;
