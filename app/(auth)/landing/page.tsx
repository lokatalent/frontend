import Footer from "@/components/Footer";
import ApplyHere from "@/components/home/ApplyHere";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonial from "@/components/home/Testimonial";
import Preview from "@/components/home/Preview";

export default function Home() {
  const loggedIn = false; // Replace with actual authentication logic

  return (
    <div>
      {/* {loggedIn && ( */}
      <div>
        <Hero />
        <Preview />
        <HowItWorks />
        <ApplyHere />
        {/* <Testimonial /> */}
        <Footer />
      </div>
      {/* )} */}
    </div>
  );
}
