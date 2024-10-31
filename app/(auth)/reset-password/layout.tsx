"use client"
import { useRouter } from "next/navigation";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
	}) {
	const router = useRouter();
	return (
    <section className="bg-primaryBg relative h-screen">
      <div className="self-start cursor-pointer absolute top-[5%] sm:top-[10%] md:top-[10%] lg:top-[10%] left-[3%] h-12 w-12">
        <div onClick={() => router.back()}>
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6924 9.16754L13.458 17.7485L22.0389 23.9829"
              stroke="#212121"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {children}
    </section>
  );
}
