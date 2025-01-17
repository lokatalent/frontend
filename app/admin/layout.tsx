import TopNav from "@/components/dash/TopNav";
import SideNav from "@/components/dash/SideNav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedIn = true;

	// if (!loggedIn) redirect("/login");
	return (
		<div className=" main-contain ">
			<div className="flex flex-row">
				<div className="sidenav-container">
					<SideNav />
				</div>
				<div className="flex-1 md:ml-[200px] ">
					<TopNav />
				</div>
			</div>

			<div className="main-content  mx-8">{children}</div>
		</div>
	);
}
