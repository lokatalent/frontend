import Waitlist from "@/components/home/Waitlist";
import Navbar from "@/components/Nav";

export default function Home() {

  return (
    <div>
      <Navbar waitlist={true} />
      <div>
        <Waitlist />
      </div>
    </div>
  );
}
