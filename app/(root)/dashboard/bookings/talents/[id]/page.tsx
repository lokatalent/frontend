"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft, FaCheckCircle, FaStar } from "react-icons/fa";

function TalentDetails() {
  const router = useRouter();
  const [tab, setTab] = useState(1);
  return (
    <div className="py-5">
      <div className="relative talent_gradient pl-14 pr-20 rounded-[16px]">
        {/* back icon */}
        <FaAngleLeft
          color="white"
          className="absolute top-5 left-5"
          size={24}
          onClick={() => router.back()}
        />
        <div className="relative top-20 bg-white shadow rounded-xl w-full px-10 py-12 flex gap-5">
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
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h1 className="text-2xl font-semibold text-primaryBlue">
                    Ayobami Daramola
                  </h1>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full mr-2 bg-green-500"></div>
                    <span>Verified</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <p>(5)</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p className="text-xl mt-2">Indoor Cleaner</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                  <span>Available for work</span>
                </div>
              </div>
              <Link href={"/dashboard/bookings/payments"}>
              <button className="btnOne max-w-[150px]">Book Now</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-28 px-8 py-10">
        <div className="flex items-center gap-5 mb-3">
          <p
            onClick={() => setTab(1)}
            className={`pb-1 cursor-pointer ${
              tab === 1 && "text-primaryBlue"
            }`}
          >
            Details
          </p>
          <p
            onClick={() => setTab(2)}
            className={`pb-1 cursor-pointer ${
              tab === 2 && "text-primaryBlue pb-1 "
            }`}
          >
            Reviews
          </p>
        </div>
        {tab === 1 && (
          <div className="bg-white shadow-lg px-5 pt-3 pb-8">
            <div className="px-5 py-8 shadow">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-orangeLight px-5 py-7">
                  <p className="text-orangeDark">
                    Bio: I am a cleaner with experience of over two years and a
                    dedicated person
                  </p>
                </div>
                <div className="px-5 py-7">
                  <p className="font-semibold">Years of experience</p>
                  <p className="mt-3">2 years</p>
                </div>
              </div>
              <div className="flex items-center gap-10 mt-8">
                <p className="text-xl font-semibold">Skills set</p>
                <div className="flex items-center gap-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <FaCheckCircle color="#DF8600" />
                    <p>Washing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle color="#DF8600" />
                    <p>Driving</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle color="#DF8600" />
                    <p>Cleaning</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle color="#DF8600" />
                    <p>Plumbing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-8 shadow mt-6">
              <p className="text-xl mb-6">Available Hours</p>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    M
                  </div>
                  <p className="text-sm">Mon</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    T
                  </div>
                  <p className="text-sm">Tue</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    W
                  </div>
                  <p className="text-sm">Wed</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    T
                  </div>
                  <p className="text-sm">Thu</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    F
                  </div>
                  <p className="text-sm">Fri</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full">
                    S
                  </div>
                  <p className="text-sm">Sat</p>
                  <p className="text-sm">9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="px-5 py-8 shadow mt-6">
              <p className="text-xl mb-6">Images</p>
              <div className="flex gap-8 mt-8">
                <div className="relative h-40 w-40">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover"
                    alt="talent-img"
                  />
                </div>
                <div className="relative h-40 w-40">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover"
                    alt="talent-img"
                  />
                </div>
                <div className="relative h-40 w-40">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover"
                    alt="talent-img"
                  />
                </div>
                <div className="relative h-40 w-40">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover"
                    alt="talent-img"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 2 && (
          <div className="bg-white shadow-lg px-5 pt-3 pb-8">
            <div className="flex items-center py-3 px-4 gap-5">
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
              <div>
                <div className="py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="font-semibold">Daniella Doe</h1>
                    <div className="flex items-center gap-1">
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum lorem ipsum lorem ipsu lorem ipsum lorem ipsum
                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum
                    lorem ipsum lorem ipsu lorem ipsum lorem ipsum lorem ipsum
                    lorem ipsum lorem
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center py-3 px-4 gap-5 mb-2 pb-3 border-t">
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
              <div>
                <div className="py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="font-semibold">Daniella Doe</h1>
                    <div className="flex items-center gap-1">
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                      <FaStar color="#FFAC33" />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum lorem ipsum lorem ipsu lorem ipsum lorem ipsum
                    lorem ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum
                    lorem ipsum lorem ipsu lorem ipsum lorem ipsum lorem ipsum
                    lorem ipsum lorem
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TalentDetails;
