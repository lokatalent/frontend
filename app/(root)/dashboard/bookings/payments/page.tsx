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
                            <span className="text-textGray3">Details</span>
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
                <div>
                    <div>
                        <h1>Pay with:</h1>
                        <div>
                            <div>
                                <input type="radio" name="channel" id="channel" /> Paystack</div>
                            <div>
                                <input type="radio" name="channel" id="channel" /> USSD</div>
                        </div>
                        <button className="btnOne">Continue</button>
                        <div>
                            <p>Please review your details and payment information carefully before confirming your booking. Cancellations within the stipulated time frame are eligible for a refund</p>
                        </div>
                    </div>
                    <div>
                        <h1>Payment Summary</h1>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Page;
