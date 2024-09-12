import ApplyHere from "@/components/home/ApplyHere";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/Nav";
import Testimonial from "../components/home/Testimonial";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div>
			<Navbar />
			<Hero />
			<HowItWorks />
			<ApplyHere />
			<Testimonial />
			<Footer />
		</div>
	);
}
