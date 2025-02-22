"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { formatNairaNumber } from "@/lib/utils";

interface CardProp {
  text: string;
  number: number;
}

const BalanceCard = ({ text, number }: CardProp) => {
    const [isDisabled, setisDisabled] = useState<boolean>(true);
    // function check(value: number) { }

    useEffect(() => {
        if (number > 0) {
            setisDisabled(false)
            return 
        }
    }, [number])
  return (
    <div className="w-full md:w-1/2 bg-balance-card bg-cover bg-center shadow-lg p-4 pl-6  border border-neutral-50 rounded-2xl flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between w-full">
        <p className="text-sm  text-white">{text}</p>
        <p className="text-2xl pt-0  font-bold text-white">{formatNairaNumber(number)}</p>
        <div className="flex pt-5 gap-2">
          <Button
            size={"lg"}
            className="bg-white text-primaryBlue disabled:bg-[#DADADA78] disabled:not-allowed disabled:opacity-100 disabled:text-white h-12"
            disabled={isDisabled}
          >
            Withdraw <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
