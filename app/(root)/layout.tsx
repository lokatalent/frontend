"use client";

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

  const role = useSelector((state: any) => state.auth.user.service_role);

  if (!loggedIn) return router.push("/login");

  return (
    <div>
      {loggedIn && (
        <div className="bg-bgWhite main-contain min-h-screen">
          <div className="flex flex-row">
            <div className="sidenav-containe">
              <SideNav talent={role === "service_provider"} />
            </div>
            <div className="flex-1 xl:ml-[200px]">
              <TopNav />
            </div>
          </div>
          <div className="main-content xl:pl-[200px] pt-24 pb-10 mx-8">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
