"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TalentItem = () => {
    const router = useRouter()
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
              <button onClick={() => router.push("/dashboard/bookings/talents/1")} className="btnTwo border border-primaryBlue">
                View Profile
              </button>
              <button onClick={() => router.push("/dashboard/bookings/payments")} className="btnOne">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

function Talents() {
  return (
    <div className="py-5 bg-bgWhite">
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
        <TalentItem />
        <TalentItem />
        <TalentItem />
        <TalentItem />
        <TalentItem />
        <TalentItem />
      </div>
    </div>
  );
}

export default Talents;
