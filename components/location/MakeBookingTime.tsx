"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Spacer } from "../Spacer";
import { useRouter } from "next/navigation";

type FormValues = {
  startTime: string;
  endTime: string;
  description: string;
};

const MakeBookingTime = () => {
  const router = useRouter();
  const { handleSubmit, control, register } = useForm<FormValues>({
    defaultValues: {
      startTime: "",
      endTime: "",
      description: "",
    },
  });

  const onSubmit = () => {
    // console.log(data);
    // handle submission logic here
    router.push("talents");
  };

  const [count, setCount] = useState(3.5);
  const [showDuration, setShowDutration] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const setDuration = () => {
    setShowDutration(true);
  };

  useEffect(() => {
    setTimeCheck(17 - Number(count));
  }, [count]);

  return (
    <div className="p-6 pb-10 w-full max-w-[567px] mx-auto">
      <div className="">
        <div className="hidden flex-row space-x-2">
          {/* Start Time Input */}

          <Controller
            name="startTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col w-full">
                <Label htmlFor="description" className="text-md pb-3">
                  Start Time*
                </Label>
                <div className="flex items-center  bg-white">
                  <div className="relative w-full">
                    <Input
                      type="time"
                      onChange={onChange}
                      value={value}
                      className="w-full p-6 pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
          />

          {/* End Time Input */}
          <Controller
            name="endTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col w-full">
                <Label htmlFor="description" className="text-md pb-3">
                  End Time*
                </Label>
                <div className="flex items-center  bg-white">
                  <div className="relative w-full">
                    <Input
                      type="time"
                      onChange={onChange}
                      value={value}
                      className="w-full p-6 pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </div>
        <p className="hidden text-xs text-textGray3 ">
          Click on the clock icon to set time
        </p>
        <div>
          <Label htmlFor="description" className="text-md pb-3">
            Start time
          </Label>
          <select
            name="time"
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="h-12 w-full rounded-full border px-5 focus:outline-none"
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
          <Label htmlFor="description" className="text-md pb-3">
            Set hours duration
          </Label>
          <div className="bg-white flex flex-row items-center justify-between border rounded-full h-14 mt-3 px-8 m-w-[496px]">
            <button onClick={decrease} disabled={count <= 3.5}>
              <FaMinus size={24} color={count <= 3.5 ? "#909090" : "black"} />
            </button>
            <h1 className="text-2xl">{count}</h1>
            <button onClick={increase} disabled={count + Number(selectedTime) >= 17}>
              <FaPlus size={24}  color={count + Number(selectedTime) >= 17 ? "#909090" : "black"} />
            </button>
          </div>
        </div>
        <Spacer size={20} />
        {/* Description Text Area */}
        <div>
          <Label htmlFor="description" className="text-md pb-3">
            Describe Your Task*
          </Label>
          <Textarea className="bg-white h-40" {...register("description")} />
        </div>
        <div className="hidden">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className=" underline underline-offset-4 text-md ">
              Set Hours Duration*
            </DialogTrigger>
            <DialogContent className="px-5 md:px-16 ">
              <DialogHeader>
                <DialogTitle className="text-lg md:text-3xl mt-5 text-center font-semibold">
                  Booking Duration
                </DialogTitle>
                <DialogDescription className=" flex flex-col justify-center items-center">
                  <p className="text-lg text-center py-3">
                    Set the number of hours you want to book this talent for the
                    job
                  </p>
                </DialogDescription>
              </DialogHeader>
              <Spacer />
              <div className="flex flex-row justify-between shadow-lg rounded-full py-4 px-8 m-w-[496px]">
                <button onClick={decrease} disabled={count <= 3.5}>
                  <FaMinus size={24} />
                </button>
                <h1 className="text-2xl">{count}</h1>
                <button onClick={increase} disabled={count >= 10}>
                  <FaPlus size={24} />
                </button>
              </div>
              <Spacer />
              <div className="flex flex-row justify-center space-x-3 w-full">
                <DialogClose asChild>
                  <button className="btnOne" onClick={setDuration}>
                    Accept
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          {showDuration && (
            <div className="flex flex-row space-x-6 bg-white p-5 rounded-sm my-5">
              <p>{count} hrs</p>

              <button
                className="text-primaryBlue cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Edit Hours Duration
              </button>
            </div>
          )}
        </div>
        <Spacer size={20} />
        <div className="w-full flex justify-center mt-8">
          <button
            type="button"
            className="btnOne max-w-[567px] p-4"
            onClick={onSubmit}
          >
            {" "}
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeBookingTime;
