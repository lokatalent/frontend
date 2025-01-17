import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { BiMessageAltDots } from "react-icons/bi";
import { PiPhoneCall } from "react-icons/pi";

interface ContactDialog {
  customerName: string;
  customerImage: string;
  talentName: string;
  talentImage: string;
}

export default function ContactDialog({
  customerName,
  customerImage,
  talentName,
  talentImage,
}: ContactDialog) {
  
  return (
    <Dialog>
      <DialogTrigger className="bg-primaryBlue px-6 py-5 text-white rounded-sm">
        Contact Customer/Talent
      </DialogTrigger>
      <DialogContent className="w-full p-[3rem] sm:max-w-[30rem] lg:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle className="text-center">Contact</DialogTitle>
        </DialogHeader>
        <div className="w-full gap-6 flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-[2rem]">
            <div className="flex gap-[1.5rem] items-center w-full">
              <div className="w-[90px] h-[90px]">
                <Image
                  src={customerImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4>{customerName}</h4>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-[100%] bg-[#115F04]"></div>
                  Customer
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 self-center">
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[100%] shadow-lg">
                  <BiMessageAltDots color="blue" size={24} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  Send a message
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[100%] shadow-lg">
                  <PiPhoneCall color="blue" size={24} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  Call (0803128736)
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[hsla(0,0%,0%,0.13)]"></div>
          <div className="flex flex-col gap-[2rem]">
            <div className="flex gap-[1.5rem] items-center">
              <div className="w-[90px] h-[90px]">
                <Image
                  src={talentImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4>{talentName}</h4>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-[100%] bg-[#115F04]"></div>
                  Talent
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 self-center">
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[100%] shadow-lg">
                  <BiMessageAltDots color="blue" size={24} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  Send a message
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[100%] shadow-lg">
                  <PiPhoneCall color="blue" size={24} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  Call (0803128736)
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
