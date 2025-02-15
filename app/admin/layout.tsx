"use client";

import TopNav from "@/components/dash/TopNav";
import SideNav from "@/components/dash/SideNav";
import { useSelector } from "react-redux";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  const currentUserRole: string = useSelector((state: any) => state.auth.user.role);
	// const loggedIn = true;

	// if (!loggedIn) redirect("/login");
	return (
    currentUserRole?.startsWith("admin") ?
      (
        <div className=" main-contain bg-bgWhite min-h-screen">
			    <div className="flex flex-row">
            <div>
              <SideNav />
            </div>
            <div className="flex-1 md:ml-[200px]">
              <TopNav />
            </div>
          </div>
          <div className="main-content md:mx-8 xl:pl-[200px] pt-24 pb-10 mx-0">{children}</div>
		    </div>
    ) : (
      <div className=" main-contain ">
        <div>Unauthorized</div>
      </div>
    )
	);
}
