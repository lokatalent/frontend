"use client";

import { Router } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TalentItem = ({setShowModal}: any) => {
  return (
    <div className="bg-white rounded-xl w-full px-10 py-8 flex gap-5">
      <div className="shrink-0">
        <div className="relative h-24 w-24 rounded-full">
          <Image
            src={`/Images/hero1.png`}
            fill
            className="object-cover rounded-full"
            alt="talent-img"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-5">
              <h1 className="text-2xl font-semibold">Ayobami Daramola</h1>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                <span>Available for work</span>
              </div>
            </div>
            <p className="text-xl mt-2">Indoor Cleaner</p>
          </div>
          <div>
            <p className="text-xl">3km away</p>
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-8">
          <p className="max-w-xl">
            I am a cleaner with over 2 years of experience loremipsum lorem
            loremipsum orem’loremipsum lorem
          </p>
          <div className="flex items-center gap-3 w-full max-w-xs shrink-0">
            <button
              onClick={setShowModal}
              className="btnTwo border border-primaryBlue"
            >
              View Profile
            </button>
            <button onClick={setShowModal} className="btnOne">
              Book Now
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

function Talents() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter();
  const onShowModal = () => {
    setShowModal(true)
  }
  return (
    <div className="py-10 bg-bgWhite wrap">
      {/* header */}
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Available talents for hire
        </h1>
        <div className="hidden justify-end mt-5">
          <button className="bg-primaryBlue text-white h-10 px-5">
            Filter
          </button>
        </div>
      </div>
      {/* main */}
      <div className="my-6 flex flex-col gap-6">
        <TalentItem setShowModal={onShowModal} />
        <TalentItem setShowModal={onShowModal} />
        <TalentItem setShowModal={onShowModal} />
        <TalentItem setShowModal={onShowModal} />
        <TalentItem setShowModal={onShowModal} />
        <TalentItem setShowModal={onShowModal} />
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-10">
          <div className="w-full h-full flex items-center md:items-start justify-center py-5 md:py-10 wrap">
            <div className="bg-white w-full max-w-[560px] rounded-md px-5 md:px-10 py-8">
              <div className="hidden fle justify-end mb-5">
                <FaTimes onClick={() => setShowModal(false)} />
              </div>
              <div className="text-center max-w-[470px] mx-auto">
                <h1 className="text-xl md:text-2xl xl:text-3xl text-textGray5">
                  You have to sign in to make a booking
                </h1>
                <p className="md:text-lg xl:text-xl mb-6 text-textGray5 md:px-4 mt-5">

                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="bg-primaryBlue text-white h-12 md:h-14 w-full"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Talents;
