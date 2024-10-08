import ApplyHere from "@/components/home/ApplyHere";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/Nav";
import Testimonial from "../components/home/Testimonial";
import Footer from "@/components/Footer";
import Preview from "@/components/home/Preview";

export default function Home() {
	return (
		<div>
			
			<Hero />
			<Preview />
			<HowItWorks />
			<ApplyHere />
			<Testimonial />
			<Footer />
		</div>
	);
}
