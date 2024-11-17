import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
	return (
    <div>
      <nav className="bg-navBlue shadow-lg hidden md:block ">
        <div className="max-w-10/12 mx-auto px-4 ">
          <div className="flex justify-between p-5">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-lg font-bold text-white">LokaTalent</span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
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
                href="/talent"
                className="border border-white  hover:bg-blue-700 text-white generalButton"
              >
                Register as a Talent
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden bg-navBlue p-4">
        <Sheet>
          <div className="flex justify-between mx-4">
            <Link href="/">
              <span className="text-lg font-bold text-white">LokassTalent</span>
            </Link>

            <SheetTrigger>
              <Image
                src="/Images/hamburger.svg"
                width={30}
                height={30}
                alt="menu"
                className="cursor-pointer"
              />
            </SheetTrigger>
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
                  href="/talent"
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
