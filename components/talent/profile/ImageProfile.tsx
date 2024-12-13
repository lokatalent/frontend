import React from "react";
import Image from "next/image";
import { BsPlusCircleDotted, BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import AddPhoto from "./AddPhoto";

function ImageProfile({ isPics = false }: boolean) {
  return (
    <div className="card">
      <h2 className="text-base font-normal mb-6">Images</h2>
      {isPics ? (
        <div className="flex  gap-4">
          <div className="relative h-[188px] w-[210px]">
            <Image
              src="/Images/hero1.png"
              alt="placeholder"
              className="object-cover rounded-lg"
              fill
            />
            <button className="absolute top-2 right-2 bg-white hover:bg-gray-300 p-1 rounded-full text-xs">
              <BsThreeDotsVertical size={25} color="black" />
            </button>
          </div>
          <div className="relative  h-[188px] w-[210px]">
            <Image
              src="/Images/hero1.png"
              alt="placeholder"
              className="object-cover rounded-lg"
              fill
            />
            <button className="absolute top-2 right-2 bg-white hover:bg-gray-300 p-1 rounded-full text-xs">
              <BsThreeDotsVertical size={25} color="black" />
            </button>
          </div>
          <div className="relative  h-[188px] w-[210px]">
            <Image
              src="/Images/hero1.png"
              alt="placeholder"
              className="object-cover rounded-lg"
              fill
            />
            <button className="absolute top-2 right-2 bg-white hover:bg-gray-300 p-1 rounded-full text-xs">
              <BsThreeDotsVertical size={25} color="black" />
            </button>
          </div>
          <div className="relative h-[188px] w-[210px] bg-[#C4C4C414] flex-center ">
            <BsPlusCircleDotted size={40} color="#3377FF" />
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col space-y-3">
          <Image
            src={"/Images/gallery-slash.png"}
            alt="empty Service"
            width={100}
            height={100}
          />
          <p className="text-[#9390908F]">No photos added yet</p>
          <AddPhoto />
        </div>
      )}
    </div>
  );
}

export default ImageProfile;
