"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const role = useSelector((state: any) => state.auth.user.service_role);

  if (role !== "service_provider") return router.push("/dashboard");

  return <div className="px-4 sm:px-6">{children}</div>;
}
