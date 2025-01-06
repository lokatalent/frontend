"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getServices } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { setAllServices, setBookingService } from "@/store/profile/bookingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";

function SelectService() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    const response = await getServices();
    if (!response.error) {
      setLoading(false);
      // ask Paul to modify this object to add the name and value
      setServices(response.data)
      dispatch(setAllServices(response.data))
    } else {
      setLoading(false);
      if (response.status === 401) {
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
        return router.push("/login");
      }

      return dispatch(
        showToast({
          status: "error",
          message: response.data.message,
        })
      );
    }
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    bookService(value);
  };

  const bookService = (service: any) => {
    dispatch(setBookingService(service));
    router.push(
      `/dashboard/bookings/location?service=${encodeURIComponent(service)}`
    );
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // const services = ['Driv]

  return (
    <div className="pt-10">
      <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl text-center mb-10">
        What Service are you looking for?
      </h1>
      <div className="flex gap-2 my-4 md:my-5 xl:my-8 max-w-xl mx-auto">
        <div className="w-full">
          <Select value={selectedService} onValueChange={handleServiceChange}>
            <SelectTrigger className="appearance-none h-12 md:h-14 xl:h-16 px-2 pr-8 xl:text-lg bg-transparent border bg-white rounded-md focus:outline-none">
              {selectedService ? (
                <SelectValue>{selectedService}</SelectValue>
              ) : (
                <SelectValue placeholder="What services do you need?" />
              )}
            </SelectTrigger>
            <SelectContent className="max-w-[320px] sm:max-w-[unset]">
              <SelectGroup>
                <SelectItem value="cleaning">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Indoor Cleaning Services</p>
                    <p className="font-light">
                      Professional cleaning of homes or offices, ensuring
                      spotless and organized interiors.
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="driving">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Driving</p>
                    <p className="font-light">
                      Reliable and safe transportation services for individuals
                      or goods.
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="plumbing">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Plumbing</p>
                    <p className="font-light">
                      Skilled plumbers ready to fix leaks, clogs, and more
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="cooking">
                  <div className=" text-primaryBlue my-2 p-2">
                    <p className="font-semibold ">Cooking</p>
                    <p className="font-light">
                      Skilled chefs that can help you prepare very tasty meals 
                    </p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-[#ede8e8] h-12 md:h-14 xl:h-16 w-16 rounded flex items-center justify-center cursor-pointer">
          <CiSearch color="black" />
        </div>
      </div>
    </div>
  );
}

export default SelectService;
