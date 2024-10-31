import Footer from "@/components/Footer";
import ApplyHere from "@/components/home/ApplyHere";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonial from "../components/home/Testimonial";
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
