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
import { FaCircleCheck } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import {
    TbCircleNumber1,
    TbCircleNumber2Filled,
    TbCircleNumber3,
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
        <div className="bg-bgWhite">
            <div className="flex flex-col justify-center mx-auto">
                <div className="my-4">
                    <div className="flex flex-row justify-center space-x-4 items-center">
                        <p className="flex flex-row space-x-3 items-center">
                            <span>
                                <FaCircleCheck
                                    size={28}
                                    style={{ fill: "#3377FF" }}
                                />
                            </span>
                            <span>Location</span>
                        </p>
                        <RxCaretRight size={20} />
                        <p className="flex flex-row space-x-3 items-center">
                            <span>
                                <FaCircleCheck
                                    size={28}
                                    style={{ fill: "#3377FF" }}
                                />
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
                    <p className="text-lg text-center">Choose how you would like to make payment</p>
                    <Spacer size={10} />

                </div>
                <div className="w-full flex justify-between gap-14 max-w-6xl mx-auto mt-5">
                    <div className="max-w-[400px] shrink-0">
                        <h1 className="font-semibold text-lg mb-5">Pay with:</h1>
                        <div className="flex items-center gap-10 mb-5">
                            <div>
                                <input type="radio" name="channel" id="channel" /> Paystack</div>
                            <div>
                                <input type="radio" name="channel" id="channel" /> USSD</div>
                        </div>
                        <button className="btnOne max-w-[250px]">Continue</button>
                        <div className="mt-12 bg-orangeLight text-[#212121CC] p-5">
                            <p>Please review your details and payment information carefully before confirming your booking. Cancellations within the stipulated time frame are eligible for a refund</p>
                        </div>
                    </div>
                    <div className="bg-white w-full py-6 px-8 rounded-md">
                        <h1 className="font-semibold text-2xl mt-6 mb-5">Payment Summary</h1>
                        <div className="relative h-40 w-40 mb-5">
                            <Image
                                src={`/Images/hero1.png`}
                                fill
                                className="object-cover"
                                alt="talent-img"
                            />
                        </div>
                        <div>
                            <h1 className="text-primaryBlue text-xl py-4">Indoor cleaning service</h1>
                        </div>
                        <div className="py-5 border-t">
                            <div className="flex items-center justify-between mb-5">
                                <p className="">Rate per hour</p>
                                <p>2,500</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>No of hours</p>
                                <p>4hrs</p>
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
                                <p className="font-semibold text-3xl">9,500</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Page;
