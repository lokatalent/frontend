import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

function Navbar({ waitlist }: { waitlist?: boolean }) {
  return (
    <div className="absolute w-full top-0 z-10">
      <nav className="bg-navBlue shadow-lg hidden w-full md:flex items-center h-20">
        <div className="w-full max-w-10/12 mx-auto px-[5%]">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-white">
                  LokaTalent
                </span>
              </Link>
            </div>
            <div
              className={`${
                waitlist ? "hidden" : "flex"
              } items-center space-x-8`}
            >
              <Link
                href="/login"
                className="text-white hover:text-primaryBlue hover:bg-white px-3 py-1"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-white hover:text-primaryBlue hover:bg-white px-3 py-1"
              >
                Sign Up
              </Link>
              <Link
                href="/signup/service-provider"
                className="border border-white  hover:bg-blue-700 text-white generalButton"
              >
                Register as a Talent
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden bg-navBlue h-[70px] md:h-20 flex items-center w-full`}
      >
        <Sheet>
          <div className="flex w-full justify-between mx-4">
            <Link href="/">
              <span className="text-xl font-bold text-white">LokaTalent</span>
            </Link>

            {!waitlist && (
              <SheetTrigger>
                <Image
                  src="/Images/hamburger.svg"
                  width={24}
                  height={24}
                  alt="menu"
                  className="cursor-pointer"
                />
              </SheetTrigger>
            )}
          </div>

          <SheetContent
            side="left"
            className="border-none bg-primaryBlue w-[300px] h-lvh "
          >
            <div className="flex flex-col justify-between h-full ">
              <div className="my-5 flex flex-col space-y-4 ">
                <SheetClose asChild className="text-start">
                  <Link
                    href="/login"
                    className="text-white hover:text-primaryBlue hover:bg-white block px-3 py-4 text-base  tracking-wider whitespace-nowrap"
                  >
                    Log In
                  </Link>
                </SheetClose>

                <SheetClose asChild className="text-start">
                  <Link
                    href="/signup"
                    className="text-white hover:text-primaryBlue hover:bg-white block px-3 py-4 text-base  tracking-wider whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </SheetClose>
              </div>

              <SheetClose asChild>
                <Link
                  href="/signup/service-provider"
                  className="border border-white  hover:bg-blue-700 text-white generalButton"
                >
                  Register as a Talent
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
