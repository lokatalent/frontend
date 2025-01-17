import InfoCard from "@/components/InfoCard";
import { FaRegUser } from "react-icons/fa";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import BookingTable from "@/components/dash/BookingTable";

 type BookingType = {
  id: string;
  customer: string;
  talent: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Declined";
};

async function getData(): Promise<BookingType[]> {
  return [
    {
      id: "12456256565",
      customer: "Justin Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Pending",
    },
    {
      id: "2565767900",
      customer: "Martin Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Accepted",
    },
    {
      id: "8698767900",
      customer: "Jayden Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Declined",
    },
    {
      id: "12456256565",
      customer: "Justin Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Pending",
    },
    {
      id: "2565767900",
      customer: "Martin Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Accepted",
    },
    {
      id: "8698767900",
      customer: "Jayden Cooper",
      talent: "Gabriel Daramola",
      date: "24/4/2024",
      time: "11:45 AM",
      status: "Declined",
    },
    // ...
  ];
}

export default async function Bookings() {
  const data = await getData();
  return (
    <div className="w-full  ">
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between w-full py-10  ">
        <InfoCard
          text="Total Bookings"
          number={250}
          icon={<FaRegUser color="#8E11F0" />}
          iconColor="#8280FF87"
          arrow={<IoMdTrendingUp color="#00B69B" />}
          comment="Up from Yesterday"
          percent={8.5}
          percentColor="#00B69B"
        />
        <InfoCard
          text="Scheduled Bookings"
          number={100}
          icon={<FaRegUser color="#3377FF" />}
          iconColor="#3377FF87"
          arrow={<IoMdTrendingUp color="#00B69B" />}
          comment="Up from Yesterday"
          percent={8.5}
          percentColor="#00B69B"
        />
        <InfoCard
          text="Instant Bookings"
          number={150}
          icon={<FaRegUser color="#D38005" />}
          iconColor="#FFAC3399"
          arrow={<IoMdTrendingDown color="#F93C65" />}
          comment="Up from Yesterday"
          percent={8.5}
          percentColor="#F93C65"
        />
      </div>

      <div>
        <BookingTable isHome={false} data={data} />
      </div>
    </div>
  );
}