import Link from "next/link";

function Navbar() {
	return (
		<nav className="bg-navBlue shadow-lg hidden md:block">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between p-5">
					<div className="flex items-center">
						<Link href="/">
							<span className="text-lg font-bold text-white">LokaTalent</span>
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							href="/signin"
							className="text-white hover:text-gray-900"
						>
							Log In
						</Link>
						<Link
							href="/signup"
							className="text-white hover:text-gray-900"
						>
							Sign Up
						</Link>
						<button className="border border-white  hover:bg-blue-700 text-white generalButton">
							Register as a Talent
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
