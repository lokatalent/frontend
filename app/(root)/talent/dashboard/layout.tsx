"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const router = useRouter();

  const role = useSelector((state: any) => state.auth.user.service_role);

  if (role !== "service_provider") return router.push("/dashboard");

  if (!loggedIn) return router.push("/login");

  return <div>{children}</div>;
}
