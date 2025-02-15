"use client";
import Link from "next/link";
import {
	IoGridOutline,
	IoReceiptOutline,
	IoWalletOutline,
	IoPieChartOutline,
	IoSettingsOutline,
} from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RiExchange2Line } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedin } from "@/store/auth/authSlice";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuBurger } from "react-icons/ci";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

const links = [
	{
		id: 1,
		name: "Overview",
		icon: <IoGridOutline />,
		link: "/admin/",
	},
	{
		id: 2,
		name: "Users",
		icon: <FaRegUser />,
		link: "/admin/users",
	},
	{
		id: 3,
		name: "Bookings",
		icon: <IoReceiptOutline />,
		link: "/admin/bookings",
	},
	{
		id: 4,
		name: "Payments",
		icon: <IoWalletOutline />,
		link: "/admin/payments",
	},
];

const SideNav = () => {
	const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const onLogout = () => {
    dispatch(setLoggedin(false));
    sessionStorage.removeItem("lokaToken");
    router.push("/login");
  };

	return (
    <div>
      <div className="bg-primaryBlue w-[200px] h-screen fixed z-[20] text-white py-8 px-5 flex-col justify-between hidden xl:flex">
        <div>
          <Link href="/dashboard">
            <span className="text-lg font-bold text-white">LokaTalent</span>
          </Link>
          <div className="flex flex-col space-y-7 mt-6">
            {links.map((link) => (
              <Link
                href={link.link}
                key={link.id}
                className={`${
                  (pathname === "/admin" && link.link === "/admin") ||
                  (pathname === link.link)
                    ? "bg-white/30"
                    : ""
                } text-white flex space-x-3 items-center font-semibold p-3 hover:p-3 focus:p-3 hover:bg-white/30 focus:bg-white/30 rounded-lg`}
              >
                {link.icon}
                <p>{link.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link
            href="/dashboard/settings/profile"
            className="flex space-x-3 items-center font-semibold p-3 hover:p-3 focus:p-3 hover:bg-white/30 focus:bg-white/30 rounded-lg"
          >
            <IoSettingsOutline /> <p>Settings</p>
          </Link>
          <div className="font-semibold p-3 hover:p-3 focus:p-3 focus:bg-white/30 rounded-lg">
            <button onClick={onLogout} className="flex space-x-3 items-center">
              <HiArrowRightEndOnRectangle />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
      <div className="xl:hidden bg-white fixed top-0 left-0 z-[20] px-2 flex items-center justify-center min-h-[70px]">
        <Sheet>
          <div className="flex justify-between mx-4">
            <SheetTrigger>
              <CiMenuBurger color="#3377ff" size={25} />
            </SheetTrigger>
          </div>

          <SheetContent
            side="left"
            className="border-none bg-primaryBlue w-[250px] h-lvh "
          >
            <div className="flex flex-col justify-between h-full ">
              <div>
                <Link href="/dashboard">
                  <span className="text-lg font-bold text-white">
                    LokaTalent
                  </span>
                </Link>

                <div className="flex flex-col space-y-7 mt-6">
                  {links.map((link) => (
                    <Link
                      href={link.link}
                      key={link.id}
                      className={`${
                        pathname === link.link ? "bg-white/30" : ""
                      } text-white flex space-x-3 items-center font-semibold p-3 hover:p-3 focus:p-3 hover:bg-white/30 focus:bg-white/30 rounded-lg`}
                    >
                      {link.icon}
                      <p>{link.name}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <SheetClose asChild>
                <div className="text-white">
                  <Link
                    href="/dashboard/settings/profile"
                  className="flex space-x-3 items-center font-semibold p-3 hover:p-3 focus:p-3 hover:bg-white/30 focus:bg-white/30 rounded-lg"
                  >
                    <span className="shrink-0">
                      <IoSettingsOutline />{" "}
                    </span>
                    <p>Settings</p>
                  </Link>
                  <div className="font-semibold p-3 hover:p-3 focus:p-3 hover:text-white hover:bg-white/30 focus:bg-white/30 rounded-lg">
                    <button
                      onClick={onLogout}
                      className="flex space-x-3 items-center"
                    >
                      <span className="shrink-0">
                        <HiArrowRightEndOnRectangle />
                      </span>
                      <p>Logout</p>
                    </button>
                  </div>
                </div>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
	);
};

export default SideNav;
