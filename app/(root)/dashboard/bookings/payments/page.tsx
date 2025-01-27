"use client";

import { Spacer } from "@/components/Spacer";
import Spinner from "@/components/ui/Spinner";
import { formatNairaNumber } from "@/lib/utils";
import {
  createBooking,
  makePayment,
  selectProvider,
  verifyPayment,
} from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import { TbCircleNumber3 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import PaystackPop from "@paystack/inline-js";

const DashboardPaymentPage = () => {
  // get booking data
  const bookingData = useSelector((state: any) => state.booking.bookingData);

  const talentData = useSelector((state: any) => state.booking.talentData);

  const tax = 500;

  const [hoursCount, setHoursCount] = useState<any>("");
  const [finalAmount, setFinalAmount] = useState<any>("");

  const getPaymentData = () => {
    let start = bookingData.start_time.split(":");
    let end = bookingData.end_time.split(":");
    let result = end[0] - start[0];
    setHoursCount(result);

    let finalAmount = bookingData.total_price + tax;
    setFinalAmount(finalAmount);
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onCreateBooking = async () => {
    setLoading(true);
    const response = await createBooking(bookingData);
    if (!response.error) {
      console.log("Booking", response.data);
      onMakePayment(response.data.id);
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

  const onAddProvider = async (id: any) => {
    let data = {
      provider_id: talentData.provider_id,
      booking_id: id,
    };
    const response = await selectProvider(data);
    if (!response.error) {
      setLoading(false);
      let result = response.data
      console.log("Provider", result);
      // redirect to booking details page
      router.push(`/dashboard/bookings/${id}`)
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

  const onMakePayment = async (id: any) => {
    let data = {
      booking_id: id,
      callback_url: "",
    };
    
    const response = await makePayment(data);
    if (!response.error) {
      console.log("Initialize Payment", response.data);
      const popup = new PaystackPop();
      const callbacks = {
        onSuccess: () => onVerifyPayment(id),
        onCancel: () =>
          dispatch(
            showToast({
              status: "error",
              message: "Payment was cancelled",
            })
          ),
      };
      popup.resumeTransaction(response.data, callbacks);
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

  const onVerifyPayment = async (id: any) => {
    let data = {
      booking_id: id,
    };
    const response = await verifyPayment(data);
    if (!response.error) {
      console.log("Verify Payment", response.data);
      onAddProvider(id);
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

  const onSubmit = () => {
    onCreateBooking();
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  return (
    <div className="bg-bgWhite">
      <div className="flex flex-col justify-center mx-auto">
        <div className="my-4">
          <div className="flex flex-row justify-center space-x-4 items-center">
            <p className="flex flex-row space-x-3 items-center">
              <span>
                <FaCircleCheck size={28} style={{ fill: "#3377FF" }} />
              </span>
              <span>Location</span>
            </p>
            <RxCaretRight size={20} />
            <p className="flex flex-row space-x-3 items-center">
              <span>
                <FaCircleCheck size={28} style={{ fill: "#3377FF" }} />
              </span>
              <span>Details</span>
            </p>
            <RxCaretRight size={20} />
            <p className="flex flex-row space-x-3 items-center">
              <span>
                <TbCircleNumber3
                  size={28}
                  style={{ color: "#3377FF", borderColor: "#3377FF" }}
                />
              </span>
              <span className="text-textGray3">Payment</span>
            </p>
          </div>
        </div>
        <Spacer size={10} />
        <div className="">
          <h1 className="font-semibold text-3xl my-5 text-center">
            Payment Checkout
          </h1>
          <p className="text-lg text-center">
            Choose how you would like to make payment
          </p>
          <Spacer size={10} />
        </div>
        <div className="w-full flex justify-between gap-14 max-w-6xl mx-auto mt-5">
          <div className="max-w-[400px] shrink-0">
            <h1 className="font-semibold text-lg mb-5">Pay with:</h1>
            <div className="flex items-center gap-10 mb-5">
              <div>
                <input type="radio" name="channel" id="channel" checked />{" "}
                Paystack
              </div>
              <div className="hidden">
                <input type="radio" name="channel" id="channel" /> USSD
              </div>
            </div>
            <button onClick={onSubmit} className="btnOne max-w-[250px]">
              {loading ? <Spinner /> : "Continue"}
            </button>
            <div className="mt-12 bg-orangeLight text-[#212121CC] p-5">
              <p>
                Please review your details and payment information carefully
                before confirming your booking. Cancellations within the
                stipulated time frame are eligible for a refund
              </p>
            </div>
          </div>
          <div className="bg-white w-full py-6 px-8 rounded-md">
            <h1 className="font-semibold text-2xl mt-6 mb-5">
              Payment Summary
            </h1>
            <div className="relative h-40 w-40 mb-5">
              <Image
                src={talentData.provider_details.avatar}
                fill
                className="object-cover"
                alt="talent-img"
              />
            </div>
            <div>
              <h1 className="text-primaryBlue text-xl py-4">
                Indoor cleaning service
              </h1>
            </div>
            <div className="py-5 border-t">
              <div className="items-center justify-between mb-5 hidden">
                <p className="">Rate per hour</p>
                <p>2,500</p>
              </div>
              <div className="flex items-center justify-between">
                <p>No of hours</p>
                <p>{`${hoursCount}hrs`}</p>
              </div>
            </div>
            <div className="border-t py-5">
              <div className="flex items-center justify-between">
                <p>Tax</p>
                <p>500</p>
              </div>
            </div>
            <div className="border-t py-5">
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p className="font-semibold text-3xl">
                  {formatNairaNumber(finalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPaymentPage;
