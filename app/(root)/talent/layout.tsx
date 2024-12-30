
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
        <div className="bg-bgWhite main-contain min-h-screen">
          <div className="flex flex-row">
            <div className="sidenav-container">
              <SideNav talent={true} />
            </div>
            <div className="flex-1 md:ml-[200px] ">
              <TopNav />
            </div>
          </div>

          <div className="main-content pl-[2rem] pr-[2rem] md:pl-[14rem] md:pr-[2rem] pt-5 pb-10">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
