"use client";

import { Spacer } from "@/components/Spacer";
import Spinner from "@/components/ui/Spinner";
import { formatNairaNumber, handleUnauthorizedError } from "@/lib/utils";
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
import { useDispatch, useSelector } from "react-redux";
// import PaystackPop from "@paystack/inline-js";
import { RxCaretRight } from "react-icons/rx";
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleNumber3 } from "react-icons/tb";

const DashboardPaymentPage = () => {
  // get booking data
  const bookingData = useSelector((state: any) => state.booking.bookingData);
  const talentData = useSelector((state: any) => state.booking.talentData);
  const serviceData = useSelector((state: any) => state.booking.allServices.filter((job) => job?.service_type === bookingData?.service_type));
  const [hoursCount, setHoursCount] = useState<any>("");
  const [finalAmount, setFinalAmount] = useState<any>("");
  const [intervalID, setIntervalID] = useState<any>(0);

  const getPaymentData = () => {
    let start = bookingData.start_time.split(":");
    let end = bookingData.end_time.split(":");
    let result = end[0] - start[0];
    setHoursCount(result);

    let finalAmount = bookingData.total_price;
    setFinalAmount(finalAmount);
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onCreateBooking = async () => {
    setLoading(true);
    const response = await createBooking(bookingData);
    if (!response.error) {
      onMakePayment(response.data.id);
    } else {
      setLoading(false);
      return handleUnauthorizedError(response, dispatch, router, showToast);
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
      router.push(`/dashboard/bookings/${id}`);
    } else {
      setLoading(false);
      return handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };


  const paystackFunction = async (code: any, id: any, ref: any) => {
     const PaystackPop = (await import("@paystack/inline-js")).default;
     const popup = new PaystackPop();
     const callbacks = {
        onSuccess: () => {
          if (!intervalID) setIntervalID(setInterval(onVerifyPayment, 500, id, ref));
        },
        onCancel: () =>
          dispatch(
            showToast({
              status: "error",
              message: "Payment was cancelled",
            })
          ),
     };
     popup.resumeTransaction(code, callbacks);
  };

  const onMakePayment = async (id: any) => {
    let data = {
      booking_id: id,
      callback_url: `${window.location.origin}/dashboard/bookings/payments`,
      metadata: JSON.stringify({booking_id: id}),
    };

    const response = await makePayment(data);
    if (!response.error) {
      await paystackFunction(response.data.access_code, id, response.data.payment_ref);
    } else {
      setLoading(false);
      return handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const onVerifyPayment = async (id: any, ref: any) => {
    let data = {
      booking_id: id,
      payment_ref: ref,
    };
    const response = await verifyPayment(data);
    if (!response.error) {
      if (response.data?.status == "verified") {
        clearInterval(intervalID);
        setIntervalID(0);
        onAddProvider(id);
      }
    } else {
      setLoading(false);
      return handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const onSubmit = () => {
    onCreateBooking();
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  return (
  <div className="bg-bgWhite px-4 sm:px-6 py-6 sm:py-8">
  <div className="flex flex-col justify-center mx-auto max-w-6xl">
    {/* Progress Steps */}
    <div className="my-3 sm:my-4 overflow-x-auto">
      <div className="flex flex-row justify-center space-x-2 sm:space-x-4 items-center min-w-max mx-auto">
        <p className="flex flex-row space-x-1 sm:space-x-3 items-center">
          <span>
            <FaCircleCheck size={20} style={{ fill: "#3377FF" }} />
          </span>
          <span className="text-sm sm:text-base">Location</span>
        </p>
        <RxCaretRight size={16} className="hidden sm:block" />
        <span className="text-gray-400 sm:hidden">→</span>
        <p className="flex flex-row space-x-1 sm:space-x-3 items-center">
          <span>
            <FaCircleCheck size={20} style={{ fill: "#3377FF" }} />
          </span>
          <span className="text-sm sm:text-base">Details</span>
        </p>
        <RxCaretRight size={16} className="hidden sm:block" />
        <span className="text-gray-400 sm:hidden">→</span>
        <p className="flex flex-row space-x-1 sm:space-x-3 items-center">
          <span>
            <TbCircleNumber3
              size={20}
              style={{ color: "#3377FF", borderColor: "#3377FF" }}
            />
          </span>
          <span className="text-textGray3 text-sm sm:text-base">Payment</span>
        </p>
      </div>
    </div>

    <Spacer size={6} />
    
    {/* Page Title */}
    <div className="">
      <h1 className="font-semibold text-xl sm:text-3xl my-3 sm:my-5 text-center">
        Payment Checkout
      </h1>
      <p className="text-base sm:text-lg text-center">
        Choose how you would like to make payment
      </p>
      <Spacer size={6} />
    </div>
    
    {/* Main Content - Payment sections */}
    <div className="w-full flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-14 mx-auto mt-3 sm:mt-5">
      {/* Payment Method Section */}
      <div className="w-full lg:max-w-[400px] lg:shrink-0 order-2 lg:order-1">
        <h1 className="font-semibold text-base sm:text-lg mb-3 sm:mb-5">Pay with:</h1>
        <div className="flex items-center gap-4 sm:gap-10 mb-3 sm:mb-5">
          <div className="flex items-center gap-2">
            <input type="radio" name="channel" id="channel" checked /> 
            <span className="text-sm sm:text-base">Paystack</span>
          </div>
          <div className="hidden">
            <input type="radio" name="channel" id="channel" /> 
            <span className="text-sm sm:text-base">USSD</span>
          </div>
        </div>
        <button onClick={onSubmit} className="btnOne w-full sm:max-w-[250px]">
          {loading ? <Spinner /> : "Continue"}
        </button>
        <div className="mt-6 sm:mt-12 bg-orangeLight text-[#212121CC] p-3 sm:p-5 text-sm sm:text-base">
          <p>
            Please review your details and payment information carefully
            before confirming your booking. Cancellations within the
            stipulated time frame are eligible for a refund
          </p>
        </div>
      </div>
      
      {/* Payment Summary Section */}
      <div className="bg-white w-full py-4 sm:py-6 px-4 sm:px-8 rounded-md order-1 lg:order-2">
        <h1 className="font-semibold text-xl sm:text-2xl mt-3 sm:mt-6 mb-3 sm:mb-5 capitalize">
          {`Payment Summary for ${bookingData?.service_type} Service`}
        </h1>
        <div className="flex flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-5">
          <div className="relative h-24 w-24 sm:h-40 sm:w-40 shrink-0">
            <Image
              src={talentData.provider_details.avatar}
              fill
              className="object-cover"
              alt="talent-img"
            />
          </div>
        </div>
        
        <div className="py-3 sm:py-5 border-t">
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <p className="text-sm sm:text-base">Rate per hour</p>
            <p className="font-semibold text-xl sm:text-3xl">{formatNairaNumber(serviceData[0]?.rate_per_hour)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base">No of hours</p>
            <p className="font-semibold text-base sm:text-xl">{`${hoursCount}hrs`}</p>
          </div>
        </div>
        
        <div className="border-t py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base">Total</p>
            <p className="font-semibold text-xl sm:text-3xl">
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
