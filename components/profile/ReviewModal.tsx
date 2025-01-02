import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface ReviewModalProps  {
  linkTo: string;
}

function ReviewModal({ linkTo }: ReviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="font-nunito text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] mx-auto rounded h-14 flex items-center justify-center hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
      >
        Submit
      </DialogTrigger>
      <DialogContent className="w-full rounded-lg p-[3rem] max-w-[20rem] sm:max-w-[30rem] lg:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Reviewing your Details
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center items-center gap-1 sm:gap-[2rem]">
          <div>
            <Image
              src="/Images/SendOut.png"
              alt="Mark"
              width={150}
              height={150}
            />
          </div>
          <p className="w-full  text-[12px] sm:text-base text-center sm:w-2/3">
            Our team is checking your information to ensure everything is in
            order. You’ll be ready to go shortly!
          </p>
          <div className="w-full">
            <Link
              href={linkTo}
              className="font-nunito text-[12px] sm:text-[14px] !text-[#fff] bg-[#3377FF]  font-normal leading-6 w-full sm:w-[15rem] md:w-[15rem] lg:w-[15rem] rounded h-12 flex items-center justify-center"
            >
              Done
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewModal;
