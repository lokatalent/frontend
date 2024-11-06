
import SideNav from "@/components/SideNav";
// import "../globals.css";
import TopNav from "@/components/TopNav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = true;

  // if (!loggedIn) redirect("/login");
  return (
    <>
      {loggedIn && (
        <div className=" main-contain ">
          <div className="flex flex-row">
            <div className="sidenav-container">
              <SideNav />
            </div>
            <div className="flex-1 md:ml-[200px] ">
              <TopNav />
            </div>
          </div>

          <div className="main-content bg-primaryBg pl-[2rem] pr-[2rem] py-[2rem] md:pl-[14rem] md:pr-[2rem] md:py-[2rem]">
            {children}
          </div>
        </div>
      )}
    </>
  );
}