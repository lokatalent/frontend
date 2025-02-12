"use client";

import TopNav from "@/components/dash/TopNav";
import SideNav from "@/components/dash/SideNav";
import { useSelector } from "react-redux";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  const currentUserRole = useSelector((state: any) => state.auth.user.role);
	// const loggedIn = true;

	// if (!loggedIn) redirect("/login");
	return (
    currentUserRole.startsWith("admin") ?
      (
        <div className=" main-contain ">
			    <div className="flex flex-row">
            <div className="sidenav-container">
              <SideNav />
            </div>
            <div className="flex-1 md:ml-[200px]">
              <TopNav />
            </div>
          </div>
          <div className="main-content xl:pl-[200px] mx-8">{children}</div>
		    </div>
    ) : (
      <div className=" main-contain ">
        <div>Unauthorized</div>
      </div>
    )
	);
}
