"use client"

import SideNav from "@/components/SideNav";
// import "../globals.css";
import TopNav from "@/components/TopNav";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);

  const router = useRouter();

  if (!loggedIn) return router.push("/login");
  return (
    <>
      {loggedIn && (
        <div className="bg-bgWhite  main-contain min-h-screen">
          <div className="flex flex-row">
            <div className="sidenav-container">
              <SideNav />
            </div>
            <div className="flex-1 md:ml-[200px] ">
              <TopNav />
            </div>
          </div>

          <div className="main-content pl-[2rem] pr-[2rem] py-[2rem] md:pl-[14rem] md:pr-[2rem] md:py-[2rem]">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
