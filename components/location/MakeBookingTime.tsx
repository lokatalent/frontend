"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Spacer } from "../Spacer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import Spinner from "../ui/Spinner";

const MakeBookingTime = () => {
  const service = useSelector((state: any) => state.booking.service);
  const services = useSelector((state: any) => state.booking.allServices);
  const location = useSelector((state: any) => state.booking.location);
  const user = useSelector((state: any) => state.auth.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const [count, setCount] = useState(3.5);
  const time = [
    {
      text: "7:00 - 7:30",
      value: "7",
    },
    {
      text: "7:00 - 7:30",
      value: "7",
    },
    {
      text: "8:00 - 8:30",
      value: "8",
    },
    {
      text: "9:00 - 9:30",
      value: "9",
    },
    {
      text: "10:00 - 10:30",
      value: "10",
    },
    {
      text: "11:00 - 11:30",
      value: "11",
    },
    {
      text: "12:00 - 12:30",
      value: "12",
    },
    {
      text: "13:00 - 13:30",
      value: "13",
    },
    {
      text: "14:00 - 14:30",
      value: "14",
    },
    {
      text: "15:00 - 15:30",
      value: "15",
    },
    {
      text: "16:00 - 16:30",
      value: "16",
    },
    {
      text: "17:00 - 17:30",
      value: "17",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("7");
  const [timeCheck, setTimeCheck] = useState(11);

  const increase = () => {
    if (count < 10) {
      setCount((prev) => Math.min(prev + 0.5, 10));
    }
  };

  const decrease = () => {
    if (count > 3.5) {
      setCount((prev) => Math.max(prev - 0.5, 3.5));
    }
  };

  const getPrice = () => {
    let selected = services.filter(
      (item: any) => item.service_type === service
    );
    return Number(selected[0].rate_per_hour) * Number(count);
  };

  const roundUpIfDecimal = (num: any) => {
    if (num % 1 !== 0) {
      // If the number has a fractional part, round it up
      return Number(Math.ceil(num));
    }
    // If the number is already an integer, return it as is
    return Number(num);
  };

  const onSubmit = async () => {
    if (!description)
      return dispatch(
        showToast({
          status: "error",
          message: "Add a desription for the booking",
        })
      );
    let dateToday = new Date();
    let data = {
      requester_id: user.id,
      requester_addr: location,
      service_type: service,
      booking_type: "instant",
      service_desc: description,
      start_time: `${selectedTime}:00:00+01:00`,
      end_time: `${Number(selectedTime) + roundUpIfDecimal(count)}:00:00+01:00`,
      start_date: dateToday.toISOString().split("T")[0],
      end_date: dateToday.toISOString().split("T")[0],
      total_price: getPrice(),
    };
    // handle submission logic here
    setLoading(true);
    const response = await createBooking(data);
    if (!response.error) {
      setLoading(false);
      dispatch(
        showToast({
          status: "success",
          message: "Booking has been created successfully",
        })
      );
      router.push(`talents?id=${encodeURIComponent(response.data.id)}`);
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

  useEffect(() => {
    setTimeCheck(17 - Number(count));
  }, [count]);

  return (
    <div className="p-6 pb-10 w-full max-w-[567px] mx-auto">
      <div className="">
        <div>
          <Label htmlFor="description" className="text-md pb-1">
            Start time
          </Label>
          <select
            name="time"
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="h-14 w-full rounded-lg border px-5 focus:outline-none"
          >
            {time.map((item, index) => (
              <option
                key={index}
                value={item.value}
                disabled={timeCheck < Number(item.value)}
              >
                {item.text}
              </option>
            ))}
          </select>
        </div>
        <Spacer size={20} />
        <div>
          <Label htmlFor="description" className="text-md pb-1">
            Set hours duration
          </Label>
          <div className="bg-white flex flex-row items-center justify-between border rounded-lg h-14 px-8 m-w-[496px]">
            <button onClick={decrease} disabled={count <= 3.5}>
              <FaMinus size={16} color={count <= 3.5 ? "#909090" : "black"} />
            </button>
            <h1 className="text-2xl">{count}</h1>
            <button
              onClick={increase}
              disabled={count + Number(selectedTime) >= 17}
            >
              <FaPlus
                size={16}
                color={count + Number(selectedTime) >= 17 ? "#909090" : "black"}
              />
            </button>
          </div>
        </div>
        <Spacer size={20} />
        {/* Description Text Area */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="text-md pb-1">
            Describe Your Task*
          </Label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="p-5 focus:outline-none h-36 border rounded-lg"
            name="description"
            id="description"
            value={description}
          ></textarea>
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            type="button"
            className="btnOne max-w-[567px] p-4 rounded-lg"
            onClick={onSubmit}
          >
            {loading ? <Spinner /> : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeBookingTime;
