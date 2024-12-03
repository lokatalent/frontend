"use client";
import LogInAuth from "@/components/auth/LogInAuth";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();  

  return (
    <section className="w-full py-5">
      <LogInAuth />
    </section>
  );
};

export default LogIn;
