"use client";
import Navbar from "@/components/Nav";
import { useRouter } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <section className="pt-14 pb-10 bg-bgWhite wrap relative min-h-screen flex items-center wrap justify-center w-full">
      {children}
    </section>
  );
}
