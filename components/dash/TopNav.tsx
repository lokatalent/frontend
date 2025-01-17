// components/TopNav.tsx
import { FaBell } from "react-icons/fa"; // Notification bell icon
import Image from "next/image"; // For the user profile image
import Link from "next/link"; // To navigate if needed

const TopNav = () => {
	return (
		<nav className="w-full bg-white p-3 shadow-lg flex justify-between items-center">
			{/* Logo or Brand */}
			<div className=" text-xl font-bold">
				
			</div>

			{/* Right Side: Notification Bell and User Profile */}
			<div className="flex items-center space-x-4">
				{/* Notification Bell */}
				<button className=" hover:text-gray-300 relative">
					<FaBell size={24} />
					{/* Notification Badge (optional) */}
					<span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
						3
					</span>
				</button>

				{/* User Profile */}
				<div className="flex items-center space-x-2">
					<Image
						src={"/Images/success.png"}
						alt="Profile Picture"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<p className="">John Doe</p>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
